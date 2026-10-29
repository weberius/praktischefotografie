// Minimaler PNG-Kodierer und -Dekodierer (RGBA, 8 Bit, nicht interlaced) für Tests der Bildskripte, ohne Abhängigkeit.
import { deflateSync, inflateSync } from 'node:zlib';

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const out = Buffer.alloc(12 + data.length);
  out.writeUInt32BE(data.length, 0);
  out.write(type, 4, 'ascii');
  data.copy(out, 8);
  out.writeUInt32BE(crc32(out.subarray(4, 8 + data.length)), 8 + data.length);
  return out;
};

/** Kodiert RGBA-Pixel (Uint8Array, Zeile für Zeile) als PNG. */
export function encodePng(width, height, rgba) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0;
    Buffer.from(rgba.buffer, rgba.byteOffset + y * width * 4, width * 4).copy(raw, y * (width * 4 + 1) + 1);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}

/** Liest Breite und Höhe aus dem IHDR-Block. */
export function pngSize(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error('keine PNG-Datei');
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

/** Dekodiert ein PNG (Farbtyp 6 oder 2, 8 Bit) zu RGBA. */
export function decodePng(buf) {
  const { width, height } = pngSize(buf);
  const colorType = buf[25];
  const channels = colorType === 6 ? 4 : colorType === 2 ? 3 : 0;
  if (!channels || buf[24] !== 8 || buf[28] !== 0) throw new Error(`nicht unterstütztes PNG (Farbtyp ${colorType})`);
  const idat = [];
  for (let p = 8; p < buf.length; ) {
    const len = buf.readUInt32BE(p);
    const type = buf.toString('ascii', p + 4, p + 8);
    if (type === 'IDAT') idat.push(buf.subarray(p + 8, p + 8 + len));
    p += 12 + len;
  }
  const raw = inflateSync(Buffer.concat(idat));
  const stride = width * channels;
  const rows = [];
  let prev = Buffer.alloc(stride);
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const line = Buffer.from(raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1)));
    for (let i = 0; i < stride; i++) {
      const a = i >= channels ? line[i - channels] : 0;
      const b = prev[i];
      const c = i >= channels ? prev[i - channels] : 0;
      let add = 0;
      if (filter === 1) add = a;
      else if (filter === 2) add = b;
      else if (filter === 3) add = (a + b) >> 1;
      else if (filter === 4) {
        const pa = Math.abs(b - c), pb = Math.abs(a - c), pc = Math.abs(a + b - 2 * c);
        add = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      line[i] = (line[i] + add) & 0xff;
    }
    rows.push(line);
    prev = line;
  }
  const rgba = new Uint8Array(width * height * 4);
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    for (let k = 0; k < 3; k++) rgba[(y * width + x) * 4 + k] = rows[y][x * channels + k];
    rgba[(y * width + x) * 4 + 3] = channels === 4 ? rows[y][x * 4 + 3] : 255;
  }
  return { width, height, rgba, at: (x, y) => Array.from(rgba.subarray((y * width + x) * 4, (y * width + x) * 4 + 4)) };
}

/** Testbild nach dem Muster des Quellbildes: weißer Grund, links ein Icon (abgerundetes Rechteck mit weißen Ecken), rechts eine Postkarte. */
export function sampleSource() {
  const width = 400, height = 200;
  const rgba = new Uint8Array(width * height * 4).fill(255);
  const set = (x, y, [r, g, b]) => { const i = (y * width + x) * 4; rgba[i] = r; rgba[i + 1] = g; rgba[i + 2] = b; rgba[i + 3] = 255; };
  // Icon: x 20..62 (43 breit), y 30..75 (46 hoch), cremefarben mit farbiger Mitte; Ecken (4 px) bleiben weiß
  for (let y = 30; y <= 75; y++) for (let x = 20; x <= 62; x++) {
    const dx = Math.min(x - 20, 62 - x), dy = Math.min(y - 30, 75 - y);
    if (dx + dy < 4) continue;
    set(x, y, x > 30 && x < 52 && y > 40 && y < 65 ? [200, 60, 40] : [249, 245, 237]);
  }
  // Postkarte: x 120..360 (241 breit), y 20..170 (151 hoch), Papierfarbe mit blauer Fläche
  for (let y = 20; y <= 170; y++) for (let x = 120; x <= 360; x++) set(x, y, x > 150 && x < 330 && y > 40 && y < 150 ? [40, 90, 200] : [240, 230, 200]);
  return { width, height, png: encodePng(width, height, rgba) };
}

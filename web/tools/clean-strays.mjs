// Entfernt versehentlich angelegte Ordner mit Windows-Pfadnamen (z. B. "\\wsl.localhost\…" oder "C:\…") in web/.
// Sie entstehen, wenn ein Linux-Chrome mit einem Windows-Profilpfad gestartet wird (WSL), und bringen den Angular-Build zum Absturz.
import { readdirSync, rmSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const WEB = resolve(dirname(fileURLToPath(import.meta.url)), '..');
for (const name of readdirSync(WEB)) {
  if (/^\\|^[A-Za-z]:[\\/]|wsl\.localhost/i.test(name) && statSync(join(WEB, name)).isDirectory()) {
    rmSync(join(WEB, name), { recursive: true, force: true });
    console.warn(`Verwaisten Ordner entfernt: ${name}`);
  }
}

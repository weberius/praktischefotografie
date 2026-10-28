import { Photographer } from './models';

/** Lebensdaten als Text: „1876–1964“ bzw. „* 1944“ für lebende Personen (PHO-UB-5, PHO-UB-6). */
export function lifeLabel(life: Photographer['life']): string | null {
  if (!life) return null;
  return life.to === null ? `* ${life.from}` : `${life.from}–${life.to}`;
}

/** Relative Adresse des Portraits; die Dateien liegen im Build unter `portraits/` (PRF-UB-5). */
export const portraitUrl = (person: Photographer): string | null => (person.portrait ? `portraits/${person.portrait.file}` : null);

/** Deutsche Bezeichnung einer Sprachversion, z. B. „Englisch“ (PHO-UB-8). */
export function languageLabel(lang: string): string {
  try {
    return new Intl.DisplayNames(['de'], { type: 'language' }).of(lang) ?? lang;
  } catch {
    return lang;
  }
}

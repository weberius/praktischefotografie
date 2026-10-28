// Gherkin: web/fotografinnen.feature (PHO-UB-5, PHO-UB-6, PHO-UB-8)
import { languageLabel, lifeLabel, portraitUrl } from './photographer-profile';

describe('photographer-profile', () => {
  it('Lebensdaten', () => {
    expect(lifeLabel({ from: 1876, to: 1964 })).toBe('1876–1964');
    expect(lifeLabel({ from: 1944, to: null })).toBe('* 1944');
    expect(lifeLabel(undefined)).toBeNull();
  });

  it('Portraitadresse', () => {
    const portrait = { file: 'a.jpg', width: 400, height: 300, source: 'https://commons.wikimedia.org/wiki/File:A.jpg', credit: 'X', license: 'CC0' };
    expect(portraitUrl({ id: 'a', name: 'A', portrait })).toBe('portraits/a.jpg');
    expect(portraitUrl({ id: 'a', name: 'A' })).toBeNull();
  });

  it('Sprachbezeichnungen', () => {
    expect(languageLabel('de')).toBe('Deutsch');
    expect(languageLabel('en')).toBe('Englisch');
    expect(languageLabel('fr')).toBe('Französisch');
  });
});

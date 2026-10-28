// Gherkin: web/badges.feature · „Reihenfolge der Badges je Seite“, „Abstand zwischen Badges“, „Badges sind Text“ (BDG-UB-2 bis BDG-UB-5, BDG-UB-7)
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ExhibitionBadges, SecondBadge } from './exhibition-badges';

@Component({ imports: [ExhibitionBadges], template: '<p>davor</p><app-exhibition-badges [kind]="kind" [second]="second" [extra]="extra" /><p>danach</p>' })
class Host {
  extra: string[] = [];
  kind = 'Gruppenausstellung';
  second: SecondBadge | null = { label: 'Endet bald', status: 'endet-bald' };
}

describe('ExhibitionBadges', () => {
  function render(configure: (h: Host) => void = () => undefined): HTMLElement {
    const fixture = TestBed.createComponent(Host);
    configure(fixture.componentInstance);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('zeigt zuerst die Art, danach Status bzw. Anlass als Text', () => {
    const el = render();
    const badges = Array.from(el.querySelectorAll('.badge'));
    expect(badges.map((b) => b.textContent?.trim())).toEqual(['Gruppenausstellung', 'Endet bald']);
    expect(badges[1].classList).toContain('status-endet-bald');
  });

  it('trennt zwei Badges mit 0,25 em; ein einzelnes Badge hat keinen zusätzlichen Abstand', () => {
    const row = render().querySelector('.badge-row') as HTMLElement;
    const style = getComputedStyle(row);
    expect(style.display).toBe('flex');
    expect(Math.abs(parseFloat(style.columnGap) - parseFloat(style.fontSize) * 0.25)).toBeLessThan(0.2);
    const single = render((h) => (h.second = null));
    expect(single.querySelectorAll('.badge').length).toBe(1);
  });

  it('Szenario: Abstand zur vorhergehenden und nachfolgenden Zeile (BDG-UB-5, Q-USE-8) – 0,75 rem', () => {
    const el = render();
    const host = el.querySelector('app-exhibition-badges') as HTMLElement;
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const style = getComputedStyle(host);
    expect(Math.abs(parseFloat(style.marginTop) - 0.75 * rem)).toBeLessThan(0.5);
    expect(Math.abs(parseFloat(style.marginBottom) - 0.75 * rem)).toBeLessThan(0.5);
  });

  it('am Anfang eines Blocks entfällt der obere Abstand (BDG-UB-5)', () => {
    const fixture = TestBed.createComponent(ExhibitionBadges);
    fixture.componentRef.setInput('kind', 'Einzelausstellung');
    document.body.append(fixture.nativeElement);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const wrapper = document.createElement('div');
    document.body.append(wrapper);
    wrapper.append(host);
    expect(getComputedStyle(host).marginTop).toBe('0px');
    expect(Math.abs(parseFloat(getComputedStyle(host).marginBottom) - 0.75 * parseFloat(getComputedStyle(document.documentElement).fontSize))).toBeLessThan(0.5);
    wrapper.remove();
  });

  it('weitere Kennzeichnungen folgen nach dem Status (BDG-UB-7)', () => {
    const el = render((h) => (h.extra = ['Offizieller Partner']));
    expect(Array.from(el.querySelectorAll('.badge')).map((b) => b.textContent?.trim())).toEqual(['Gruppenausstellung', 'Endet bald', 'Offizieller Partner']);
  });
});

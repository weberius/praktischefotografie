// Gherkin: web/filter.feature · „Eine Filterbedienung auf jeder Seite“, „Auswahl aus den Daten“
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from '../../core/data.service';
import { GlobalFilter } from '../../core/global-filter';
import { provideTestData } from '../../testing/test-data';
import { GlobalFilterControl } from './global-filter';

describe('GlobalFilterControl', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [...provideTestData()] }));

  async function render(): Promise<{ el: HTMLElement; fixture: ComponentFixture<GlobalFilterControl> }> {
    const fixture = TestBed.createComponent(GlobalFilterControl);
    TestBed.inject(DataService);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    return { el: fixture.nativeElement, fixture };
  }

  it('Szenario: Auswahl aus den Daten (FLT-UB-7): nur vorkommende Typen, Orte nach Name', async () => {
    const { el } = await render();
    const legends = (name: string) => Array.from(el.querySelectorAll('fieldset')).find((f) => f.querySelector('legend')?.textContent === name)!;
    const labels = (name: string) => Array.from(legends(name).querySelectorAll('label')).map((l) => l.textContent!.trim());
    expect(labels('Ortstyp')).toEqual(['Museum', 'Galerie']);
    expect(labels('Orte')).toEqual(['Galerie Köln', 'Haus Köln Bibliothek', 'Museum Essen']);
  });

  it('Szenario: Eine Filterbedienung auf jeder Seite (FLT-UB-4): Auswahl als Text, Zurücksetzen', async () => {
    const { el, fixture } = await render();
    const filter = TestBed.inject(GlobalFilter);
    const box = el.querySelector<HTMLInputElement>('fieldset input[type=checkbox]')!;
    box.click();
    fixture.detectChanges();
    expect(filter.types()).toEqual(['museum']);
    expect(el.querySelector('[role=status]')!.textContent).toContain('Typ: Museum');
    el.querySelector<HTMLButtonElement>('.status button')!.click();
    fixture.detectChanges();
    expect(filter.active()).toBe(false);
    expect(el.querySelector('.status button')).toBeNull();
  });
});

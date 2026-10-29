import { Component, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);
  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');

  /** Zustand des Burger-Menüs (FRM-EV-1). */
  protected readonly menuOpen = signal(false);

  constructor() {
    // FRM-EV-2: Nach jedem Seitenwechsel schließt das Menü.
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd), takeUntilDestroyed()).subscribe(() => this.menuOpen.set(false));
  }

  /** FRM-EV-2: Auch der Link der aktuellen Seite löst keinen Seitenwechsel aus und muss das Menü schließen. */
  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  /** FRM-EV-3: Escape schließt das Menü und setzt den Fokus auf die Schaltfläche. */
  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    this.menuButton()?.nativeElement.focus();
  }

  protected readonly links = [
    { path: '/', label: 'Magazin', exact: true },
    { path: '/calendar', label: 'Kalender', exact: false },
    { path: '/map', label: 'Karte', exact: false },
    { path: '/venues', label: 'Orte', exact: false },
    { path: '/photographers', label: 'Fotograf:innen', exact: false },
    { path: '/exhibitions', label: 'Ausstellungen', exact: false },
    { path: '/events', label: 'Events', exact: false },
    { path: '/festivals', label: 'Festivals', exact: false },
    { path: '/organizers', label: 'Veranstalter:innen', exact: false },
  ];
}

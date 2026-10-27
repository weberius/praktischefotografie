import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
})
export class App {
  protected readonly links = [
    { path: '/', label: 'Magazin', exact: true },
    { path: '/calendar', label: 'Kalender', exact: false },
    { path: '/map', label: 'Karte', exact: false },
    { path: '/venues', label: 'Orte', exact: false },
    { path: '/photographers', label: 'Fotograf:innen', exact: false },
    { path: '/exhibitions', label: 'Ausstellungen', exact: false },
    { path: '/events', label: 'Events', exact: false },
    { path: '/organizers', label: 'Veranstalter:innen', exact: false },
  ];
}

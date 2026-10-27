import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Hinweis für unbekannte Adressen und IDs (NAV-EV-1). */
@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <h1>Seite nicht gefunden</h1>
    <p>Diese Adresse oder dieser Eintrag existiert nicht (mehr).</p>
    <p><a routerLink="/">Zur Startseite</a></p>
  `,
})
export class NotFound {}

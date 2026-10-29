import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageMeta } from '../../core/page-meta';

@Component({
  selector: 'app-datenschutz-page',
  imports: [RouterLink],
  templateUrl: './datenschutz.html',
})
export class DatenschutzPage {
  constructor() {
    inject(PageMeta).set('Datenschutz', 'Datenschutzerklärung: keine Cookies, kein Tracking, Hosting auf GitHub Pages, Kartenkacheln von OpenStreetMap und Ihre Rechte.');
  }
}

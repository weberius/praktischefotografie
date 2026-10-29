import { Component, inject } from '@angular/core';
import { PageMeta } from '../../core/page-meta';

@Component({
  selector: 'app-quellen-page',
  templateUrl: './quellen.html',
})
export class QuellenPage {
  constructor() {
    inject(PageMeta).set('Quellen & Lizenzen', 'Daten-, Bild- und Softwarequellen mit Lizenzen: Wikimedia, OpenStreetMap, Leaflet und die Webseiten der Orte und Veranstalter.');
  }
}

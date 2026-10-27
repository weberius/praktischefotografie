import { Component, inject } from '@angular/core';
import { PageMeta } from '../../core/page-meta';

@Component({
  selector: 'app-datenschutz-page',
  templateUrl: './datenschutz.html',
})
export class DatenschutzPage {
  constructor() {
    inject(PageMeta).set('Datenschutz', 'Hinweise zum Datenschutz auf Praktische Fotografie.');
  }
}

import { Component, inject } from '@angular/core';
import { PageMeta } from '../../core/page-meta';

@Component({
  selector: 'app-impressum-page',
  templateUrl: './impressum.html',
})
export class ImpressumPage {
  constructor() {
    inject(PageMeta).set('Impressum', 'Anbieterkennzeichnung nach § 5 DDG für das Zentrum für praktische Fotografie.');
  }
}

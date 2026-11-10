import { Component, inject } from '@angular/core';
import { PageMeta } from '../../core/page-meta';

@Component({
  selector: 'app-projekt-page',
  templateUrl: './projekt.html',
})
export class ProjektPage {
  constructor() {
    inject(PageMeta).set('Projekt', 'Warum es diese Webapp gibt, was sie leistet, wie du sie teilen und das Zentrum für praktische Fotografie unterstützen kannst.');
  }
}

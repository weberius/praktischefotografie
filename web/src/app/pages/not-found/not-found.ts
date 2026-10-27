import { Component, inject } from '@angular/core';
import { PageMeta } from '../../core/page-meta';
import { NotFound } from '../../shared/not-found/not-found';

@Component({
  selector: 'app-not-found-page',
  imports: [NotFound],
  template: '<app-not-found />',
})
export class NotFoundPage {
  constructor() {
    inject(PageMeta).set('Seite nicht gefunden', 'Diese Adresse existiert nicht.');
  }
}

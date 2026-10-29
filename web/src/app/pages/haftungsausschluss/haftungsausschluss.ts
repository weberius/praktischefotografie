import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageMeta } from '../../core/page-meta';

@Component({
  selector: 'app-haftungsausschluss-page',
  imports: [RouterLink],
  templateUrl: './haftungsausschluss.html',
})
export class HaftungsausschlussPage {
  constructor() {
    inject(PageMeta).set('Haftungsausschluss', 'Haftung für Inhalte und Links sowie Urheberrecht auf Praktische Fotografie.');
  }
}

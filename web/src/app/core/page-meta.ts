import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export const SITE_NAME = 'Praktische Fotografie';

/** Setzt Titel und Meta-Beschreibung einer Seite (NAV-UB-3). */
@Injectable({ providedIn: 'root' })
export class PageMeta {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  set(title: string, description: string): void {
    this.title.setTitle(`${title} · ${SITE_NAME}`);
    this.meta.updateTag({ name: 'description', content: description });
  }
}

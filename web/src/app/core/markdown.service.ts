import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { marked } from 'marked';
import { Observable, map } from 'rxjs';

/** Entfernt einen YAML-Frontmatter-Block (`---` … `---`) am Anfang des Dokuments. */
export function stripFrontmatter(markdown: string): string {
  return markdown.replace(/^\uFEFF?---[ \t]*\r?\n[\s\S]*?\r?\n---[ \t]*(?:\r?\n|$)/, '');
}

/**
 * Wandelt Markdown in HTML um (BLG-UB-3).
 * Die Ausgabe ist NICHT bereinigt: Sie darf nur über `[innerHTML]` gebunden werden,
 * wo Angulars DomSanitizer Skripte, Ereignisattribute und gefährliche URLs entfernt (BLG-UB-5, Q-SEC-3).
 */
export function markdownToHtml(markdown: string): string {
  return marked.parse(stripFrontmatter(markdown), { async: false, gfm: true });
}

@Injectable({ providedIn: 'root' })
export class MarkdownService {
  private readonly http = inject(HttpClient);

  /** Lädt eine Markdown-Datei (relative URL) und liefert HTML; bei Ladefehler meldet das Observable einen Fehler. */
  load(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'text' }).pipe(map(markdownToHtml));
  }
}

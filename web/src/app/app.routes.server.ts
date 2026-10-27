import { RenderMode, ServerRoute } from '@angular/ssr';
import { calendarParams, ids, publishedSlugs } from './prerender-params';

/** Alle Adressen aus NAV-UB-2 werden beim Build vorab gerendert (ADR-002). */
export const serverRoutes: ServerRoute[] = [
  { path: 'posts/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: async () => publishedSlugs().map((slug) => ({ slug })) },
  { path: 'calendar/:year/:month', renderMode: RenderMode.Prerender, getPrerenderParams: async () => calendarParams() },
  ...[
    ['venues/:id', 'venues'],
    ['photographers/:id', 'photographers'],
    ['exhibitions/:id', 'exhibitions'],
    ['events/:id', 'events'],
    ['organizers/:id', 'organizers'],
  ].map(([path, file]): ServerRoute => ({ path, renderMode: RenderMode.Prerender, getPrerenderParams: async () => ids(file).map((id) => ({ id })) })),
  { path: '**', renderMode: RenderMode.Prerender },
];

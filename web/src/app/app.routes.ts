import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/blog-feed/blog-feed').then((m) => m.BlogFeedPage),
  },
  {
    path: 'posts/:slug',
    loadComponent: () => import('./pages/post-detail/post-detail').then((m) => m.PostDetailPage),
  },
  {
    path: 'calendar',
    loadComponent: () => import('./pages/calendar/calendar').then((m) => m.CalendarPage),
  },
  {
    path: 'calendar/:year/:month',
    loadComponent: () => import('./pages/calendar/calendar').then((m) => m.CalendarPage),
  },
  {
    path: 'map',
    loadComponent: () => import('./pages/map/map').then((m) => m.MapPage),
  },
  {
    path: 'venues',
    loadComponent: () => import('./pages/venue-list/venue-list').then((m) => m.VenueListPage),
  },
  {
    path: 'venues/:id',
    loadComponent: () => import('./pages/venue-detail/venue-detail').then((m) => m.VenueDetailPage),
  },
  {
    path: 'photographers',
    loadComponent: () => import('./pages/photographer-list/photographer-list').then((m) => m.PhotographerListPage),
  },
  {
    path: 'photographers/:id',
    loadComponent: () => import('./pages/photographer-detail/photographer-detail').then((m) => m.PhotographerDetailPage),
  },
  {
    path: 'exhibitions',
    loadComponent: () => import('./pages/exhibition-list/exhibition-list').then((m) => m.ExhibitionListPage),
  },
  {
    path: 'exhibitions/:id',
    loadComponent: () => import('./pages/exhibition-detail/exhibition-detail').then((m) => m.ExhibitionDetailPage),
  },
  {
    path: 'events',
    loadComponent: () => import('./pages/event-list/event-list').then((m) => m.EventListPage),
  },
  {
    path: 'events/:id',
    loadComponent: () => import('./pages/event-detail/event-detail').then((m) => m.EventDetailPage),
  },
  {
    path: 'festivals',
    loadComponent: () => import('./pages/festival-list/festival-list').then((m) => m.FestivalListPage),
  },
  {
    path: 'festivals/:id',
    loadComponent: () => import('./pages/festival-detail/festival-detail').then((m) => m.FestivalDetailPage),
  },
  {
    path: 'organizers',
    loadComponent: () => import('./pages/organizer-list/organizer-list').then((m) => m.OrganizerListPage),
  },
  {
    path: 'organizers/:id',
    loadComponent: () => import('./pages/organizer-detail/organizer-detail').then((m) => m.OrganizerDetailPage),
  },
  {
    path: 'impressum',
    loadComponent: () => import('./pages/impressum/impressum').then((m) => m.ImpressumPage),
  },
  {
    path: 'datenschutz',
    loadComponent: () => import('./pages/datenschutz/datenschutz').then((m) => m.DatenschutzPage),
  },
  {
    path: '404',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFoundPage),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFoundPage),
  },
];

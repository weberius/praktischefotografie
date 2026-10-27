import { Post } from './models';

/** Veröffentlichte Beiträge (Datum nicht nach heute, BLG-UN-1), neueste zuerst (BLG-UB-1). */
export function publishedPosts(posts: Post[], today: string): Post[] {
  return posts.filter((p) => p.date <= today).sort((a, b) => b.date.localeCompare(a.date));
}

/** Veröffentlichte Beiträge, die einen Ort bzw. eine Ausstellung verknüpfen. */
export function postsLinking(posts: Post[], today: string, link: { venueId?: string; exhibitionId?: string }): Post[] {
  return publishedPosts(posts, today).filter(
    (p) =>
      (link.venueId !== undefined && p.linkedVenueIds?.includes(link.venueId)) ||
      (link.exhibitionId !== undefined && p.linkedExhibitionIds?.includes(link.exhibitionId)),
  );
}

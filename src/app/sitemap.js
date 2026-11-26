import { getProjectSlugs } from '@/lib/data';
import { SITE_URL } from '@/lib/site';

// Pages are pre-rendered, then refreshed from Supabase at most once an hour.
// (Phase 6: the admin will also refresh them right after each save.)
export const revalidate = 3600;

export default async function sitemap() {
  const slugs = await getProjectSlugs();
  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    ...slugs.map((slug) => ({ url: `${SITE_URL}/${slug}`, changeFrequency: 'yearly', priority: 0.7 })),
  ];
}

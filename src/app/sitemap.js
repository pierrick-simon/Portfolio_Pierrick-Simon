import { getProjectSlugs } from '@/lib/data';
import { SITE_URL } from '@/lib/site';

export default async function sitemap() {
  const slugs = await getProjectSlugs();
  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    ...slugs.map((slug) => ({ url: `${SITE_URL}/${slug}`, changeFrequency: 'yearly', priority: 0.7 })),
  ];
}

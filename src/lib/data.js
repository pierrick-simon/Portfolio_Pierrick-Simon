// Single entry point for site content, read from Supabase.
// The functions return the same shapes as the src/data/ files did,
// so the pages don't depend on the database layout.
import { publicClient } from '@/lib/supabase/public';

const PROJECT_COLUMNS = `
  slug, title, note, team, duration, stack, period, group_id, position,
  cover_url, summary, features, skills, gallery, video_url, docs, links, href, published,
  project_contributors ( position, people ( id, name, url ) )
`;

// Throws on error: better a failed build than a site with missing content.
async function query(label, request) {
  const { data, error } = await request;
  if (error) throw new Error(`Supabase (${label}): ${error.message}`);
  return data;
}

// Database row → the project shape used by the components.
export function toProject(row) {
  return {
    slug: row.slug,
    title: row.title,
    note: row.note ?? undefined,
    team: row.team,
    duration: row.duration,
    stack: row.stack ?? [],
    period: row.period,
    group: row.group_id,
    order: row.position,
    cover: row.cover_url,
    summary: row.summary ?? '',
    features: row.features ?? [],
    skills: row.skills ?? [],
    gallery: row.gallery ?? [],
    video: row.video_url,
    docs: row.docs ?? undefined,
    links: row.links ?? [],
    href: row.href ?? undefined,
    published: row.published,
    contributors: (row.project_contributors ?? [])
      .slice()
      .sort((a, b) => a.position - b.position)
      .map((c) => c.people)
      .filter(Boolean),
  };
}

// Published projects, grouped and ordered for the home page.
export async function getProjectGroups() {
  const db = publicClient();
  const [groups, rows] = await Promise.all([
    query('project_groups', db.from('project_groups').select('id, label').order('position')),
    query('projects', db.from('projects').select(PROJECT_COLUMNS).eq('published', true).order('position')),
  ]);
  const projects = rows.map(toProject);
  return groups.map((group) => ({
    ...group,
    projects: projects.filter((p) => p.group === group.id),
  }));
}

// Projects that have their own page (cards with a custom `href` don't).
export async function getProjectSlugs() {
  const rows = await query('projects', publicClient()
    .from('projects').select('slug').eq('published', true).is('href', null).order('slug'));
  return rows.map((r) => r.slug);
}

// Case-insensitive, so old URLs like /NanoTekspice still resolve.
export async function getProject(slug = '') {
  const wanted = decodeURIComponent(slug);
  // ilike is case-insensitive; escape its wildcards (_ and %) to match the slug literally.
  const pattern = wanted.replace(/[\\%_]/g, (c) => `\\${c}`);
  const rows = await query('project', publicClient()
    .from('projects').select(PROJECT_COLUMNS)
    .ilike('slug', pattern).eq('published', true).is('href', null).limit(2));
  const row = rows.find((r) => r.slug === wanted) ?? rows[0];
  return row ? toProject(row) : null;
}

const timeline = (table) => query(table, publicClient()
  .from(table).select('period, title, bullets').order('position'));

export async function getExperiences() {
  return timeline('experiences');
}

export async function getFormations() {
  return timeline('formations');
}

// The `settings` rows (header, about, facts, skills, cv, contact) as one object.
export async function getProfile() {
  const rows = await query('settings', publicClient().from('settings').select('key, value'));
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

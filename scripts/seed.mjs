// Copies the content of src/data/ into Supabase.
//
//   npm run db:seed
//
// Uses the secret (service role) key, which bypasses RLS: run it locally only.
// Safe to run again: rows are upserted, and contributors, experiences and
// formations are replaced, so the database ends up matching src/data/.
import { createClient } from '@supabase/supabase-js';
import { projects } from '../src/data/projects.js';
import { groups } from '../src/data/groups.js';
import { people } from '../src/data/people.js';
import { experiences } from '../src/data/experiences.js';
import { formations } from '../src/data/formations.js';
import { profile } from '../src/data/profile.js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY (see .env.local).');
  process.exit(1);
}

const db = createClient(url, key, { auth: { persistSession: false } });

async function run(label, query) {
  const { data, error } = await query;
  if (error) throw new Error(`${label}: ${error.message}`);
  return data;
}

const ALL = '00000000-0000-0000-0000-000000000000'; // "delete every row" filter

await run('people', db.from('people').upsert(
  Object.entries(people).map(([id, p]) => ({ id, name: p.name, url: p.url }))
));

await run('project_groups', db.from('project_groups').upsert(
  groups.map((g, i) => ({ id: g.id, label: g.label, position: i }))
));

const rows = await run('projects', db.from('projects').upsert(
  projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    note: p.note ?? null,
    team: p.team ?? null,
    duration: p.duration ?? null,
    stack: p.stack ?? [],
    period: p.period ?? null,
    group_id: p.group,
    position: p.order,
    cover_url: p.cover ?? null,
    summary: p.summary ?? null,
    features: p.features ?? [],
    skills: p.skills ?? [],
    gallery: p.gallery ?? [],
    video_url: p.video ?? null,
    docs: p.docs ?? null,
    links: p.links ?? [],
    href: p.href ?? null,
    published: p.published,
  })),
  { onConflict: 'slug' }
).select('id, slug'));
const idOf = Object.fromEntries(rows.map((r) => [r.slug, r.id]));

await run('project_contributors (clear)', db.from('project_contributors').delete().in('project_id', rows.map((r) => r.id)));
await run('project_contributors', db.from('project_contributors').insert(
  projects.flatMap((p) => (p.contributors ?? []).map((personId, i) => ({
    project_id: idOf[p.slug], person_id: personId, position: i,
  })))
));

for (const [table, list] of [['experiences', experiences], ['formations', formations]]) {
  await run(`${table} (clear)`, db.from(table).delete().neq('id', ALL));
  await run(table, db.from(table).insert(list.map((e, i) => ({ ...e, position: i }))));
}

await run('settings', db.from('settings').upsert(
  ['header', 'about', 'facts', 'skills', 'cv', 'contact'].map((key) => ({ key, value: profile[key] }))
));

console.log(`Seeded ${Object.keys(people).length} people, ${groups.length} groups, ${rows.length} projects, `
  + `${experiences.length} experiences, ${formations.length} formations and 6 settings.`);

// Checks the database after the seed, and that the public key cannot write.
//
//   npm run db:check
//
// 1. With the secret key: row counts match src/data/.
// 2. With the publishable (public) key, as a logged-out visitor:
//    reads work, the admins table is hidden, and every write is refused.
// Exits with code 1 if anything is wrong.
import { createClient } from '@supabase/supabase-js';
import { projects } from '../src/data/projects.js';
import { groups } from '../src/data/groups.js';
import { people } from '../src/data/people.js';
import { experiences } from '../src/data/experiences.js';
import { formations } from '../src/data/formations.js';

const { NEXT_PUBLIC_SUPABASE_URL: url, NEXT_PUBLIC_SUPABASE_ANON_KEY: publicKey, SUPABASE_SERVICE_ROLE_KEY: secretKey } = process.env;
if (!url || !publicKey || !secretKey) {
  console.error('Missing Supabase variables (see .env.local).');
  process.exit(1);
}

const options = { auth: { persistSession: false } };
const admin = createClient(url, secretKey, options);
const visitor = createClient(url, publicKey, options);

let failures = 0;
const check = (ok, label, detail = '') => {
  console.log(`${ok ? '✓' : '✗'} ${label}${detail ? ` (${detail})` : ''}`);
  if (!ok) failures += 1;
};

const count = async (client, table, filter = (q) => q) => {
  const { count: n, error } = await filter(client.from(table).select('*', { count: 'exact', head: true }));
  return error || n == null ? -1 : n;
};

console.log('Content (secret key)');
const contributorCount = projects.reduce((n, p) => n + (p.contributors?.length ?? 0), 0);
for (const [table, expected] of [
  ['people', Object.keys(people).length],
  ['project_groups', groups.length],
  ['projects', projects.length],
  ['project_contributors', contributorCount],
  ['experiences', experiences.length],
  ['formations', formations.length],
  ['settings', 6],
]) {
  const n = await count(admin, table);
  check(n === expected, n < 0 ? `${table}: missing` : `${table}: ${n} rows`, n === expected ? '' : `expected ${expected}`);
}

console.log('\nReads (public key)');
const published = projects.filter((p) => p.published).length;
const visible = await count(visitor, 'projects');
check(visible === published, `visitor sees ${visible} projects`, visible === published ? '' : `expected ${published}`);
const drafts = await count(visitor, 'projects', (q) => q.eq('published', false));
check(drafts === 0, 'visitor sees no draft project');
for (const table of ['people', 'project_groups', 'experiences', 'formations', 'settings']) {
  const n = await count(visitor, table);
  check(n > 0, `visitor can read ${table}`);
}
const { data: adminRows, error: adminError } = await visitor.from('admins').select('user_id');
check(Boolean(adminError) || adminRows.length === 0, 'visitor cannot read admins', adminError ? 'refused' : 'empty');

console.log('\nWrites (public key, must all be refused)');
const tag = `rls-check-${Date.now()}`;
const attempts = {
  people: { id: tag, name: tag },
  project_groups: { id: tag, label: tag },
  projects: { slug: tag, title: tag, published: true },
  experiences: { period: tag, title: tag },
  formations: { period: tag, title: tag },
  settings: { key: tag, value: {} },
  admins: { user_id: '00000000-0000-0000-0000-000000000000' },
};
const cleanup = {
  people: (q) => q.eq('id', tag),
  project_groups: (q) => q.eq('id', tag),
  projects: (q) => q.eq('slug', tag),
  experiences: (q) => q.eq('title', tag),
  formations: (q) => q.eq('title', tag),
  settings: (q) => q.eq('key', tag),
  admins: (q) => q.eq('user_id', '00000000-0000-0000-0000-000000000000'),
};
for (const [table, row] of Object.entries(attempts)) {
  const { error } = await visitor.from(table).insert(row);
  if (!error) await cleanup[table](admin.from(table).delete()); // it got in: remove it
  check(Boolean(error), `insert into ${table} refused`);
}

const target = projects.find((p) => p.published && !p.href).slug;
const { data: updated } = await visitor.from('projects').update({ title: tag }).eq('slug', target).select();
check(!updated || updated.length === 0, `update of /${target} refused`);
const { data: deleted } = await visitor.from('projects').delete().eq('slug', target).select();
check(!deleted || deleted.length === 0, `delete of /${target} refused`);
const { data: still } = await admin.from('projects').select('title').eq('slug', target).single();
check(still?.title !== tag, `/${target} is unchanged`);

console.log(failures ? `\n${failures} check(s) failed.` : '\nAll checks passed.');
process.exit(failures ? 1 : 0);

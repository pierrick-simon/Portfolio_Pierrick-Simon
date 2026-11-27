// Checks that the Supabase data layer returns exactly what the site showed
// when it read src/data/ ("no visible change"). Needs the database:
//
//   npm run test:db
//
// Skipped by `npm test` when the Supabase variables aren't set.
import { describe, expect, test } from 'vitest';
import * as db from '@/lib/data';
import * as files from './localData';

const hasDb = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// The database returns null, [] or '' where the files simply had no value.
const isEmpty = (v) => v === null || v === '' || (Array.isArray(v) && v.length === 0);
const clean = (value) => JSON.parse(JSON.stringify(value, (_, v) => (isEmpty(v) ? undefined : v)));
// Home cards don't show contributors (the files kept them as plain ids).
const withoutContributors = (groups) =>
  groups.map((g) => ({ ...g, projects: g.projects.map(({ contributors, ...p }) => p) }));

describe.skipIf(!hasDb)('Supabase content matches src/data', () => {
  test('home page groups and projects', async () => {
    expect(clean(withoutContributors(await db.getProjectGroups())))
      .toEqual(clean(withoutContributors(await files.getProjectGroups())));
  });

  test('project slugs', async () => {
    expect([...await db.getProjectSlugs()].sort()).toEqual([...await files.getProjectSlugs()].sort());
  });

  test('every project page', async () => {
    for (const slug of await files.getProjectSlugs()) {
      expect(clean(await db.getProject(slug)), slug).toEqual(clean(await files.getProject(slug)));
    }
  });

  test('old casing and unknown slugs', async () => {
    expect((await db.getProject('NanoTekspice'))?.slug).toBe('NanoTekSpice');
    expect(await db.getProject('Meme-Application')).toBeNull(); // "_" is not a wildcard
    expect(await db.getProject('Portfolio')).toBeNull();
    expect(await db.getProject('does-not-exist')).toBeNull();
  });

  test('experiences, formations and profile', async () => {
    expect(clean(await db.getExperiences())).toEqual(clean(await files.getExperiences()));
    expect(clean(await db.getFormations())).toEqual(clean(await files.getFormations()));
    expect(clean(await db.getProfile())).toEqual(clean(await files.getProfile()));
  });
});

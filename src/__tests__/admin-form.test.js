import { describe, expect, test } from 'vitest';
import { commaList, formatDocs, json, parseDocs, slugify } from '@/lib/admin/form';
import { formErrors, groupSchema, personSchema, projectSchema, settingsSchemas, slugSchema } from '@/lib/admin/schemas';
import { projects } from '@/data/projects';
import { profile } from '@/data/profile';
import { people } from '@/data/people';

const asForm = (p) => ({
  title: p.title, slug: p.slug, note: p.note ?? '', team: p.team ?? '', duration: p.duration ?? '',
  period: p.period ?? '', stack: p.stack ?? [], group_id: p.group, summary: p.summary ?? '',
  features: p.features ?? [], skills: p.skills ?? [], cover_url: p.cover ?? '', gallery: p.gallery ?? [],
  video_url: p.video ?? '', docs: p.docs ?? [], links: p.links ?? [], href: p.href ?? '',
  contributors: p.contributors ?? [], published: p.published,
});

describe('slugify', () => {
  test.each([
    ['Start Trek', 'Start-Trek'],
    ['R-Type', 'R-Type'],
    ['Éditeur de mèmes !', 'Editeur-de-memes'],
    ['  My_PGP  ', 'My_PGP'],
  ])('%s → %s', (title, slug) => expect(slugify(title)).toBe(slug));
});

test('slug rules', () => {
  expect(slugSchema.safeParse('MyPGP').success).toBe(true);
  expect(slugSchema.safeParse('my page').success).toBe(false);
  expect(slugSchema.safeParse('Admin').success).toBe(false); // reserved route
  expect(slugSchema.safeParse('').success).toBe(false);
});

test('docs text round-trips', () => {
  const cuddle = projects.find((p) => p.slug === 'Cuddle');
  expect(parseDocs(formatDocs(cuddle.docs))).toEqual(cuddle.docs);
});

test('json and commaList', () => {
  const f = new FormData();
  f.set('a', '["x"]');
  f.set('b', 'not json');
  expect(json(f, 'a')).toEqual(['x']);
  expect(json(f, 'b')).toEqual([]);
  expect(commaList(' C++, Python ,, ')).toEqual(['C++', 'Python']);
});

test('every existing project passes validation', () => {
  for (const p of projects) {
    const result = projectSchema.safeParse(asForm(p));
    expect(result.success, `${p.slug}: ${result.error?.message}`).toBe(true);
  }
});

test('project validation cleans and rejects', () => {
  const base = asForm(projects.find((p) => p.slug === 'MyPGP'));
  const ok = projectSchema.parse({ ...base, note: '  ', features: ['a', ' ', 'b'], contributors: ['ariel', 'ariel'] });
  expect(ok.note).toBeNull();
  expect(ok.features).toEqual(['a', 'b']);
  expect(ok.contributors).toEqual(['ariel']);

  const bad = projectSchema.safeParse({ ...base, title: ' ', links: [{ label: 'Repo', url: 'nope', text: 'x' }] });
  expect(bad.success).toBe(false);
  expect(Object.keys(formErrors(bad.error).fields)).toEqual(expect.arrayContaining(['title', 'links']));
});

test('existing people, groups and profile pass validation', () => {
  for (const [id, p] of Object.entries(people)) expect(personSchema.safeParse({ id, ...p }).success, id).toBe(true);
  expect(groupSchema.safeParse({ id: 'tek4', label: '~/projets/tek4' }).success).toBe(true);
  expect(personSchema.safeParse({ id: 'Bad Id', name: 'x', url: '' }).success).toBe(false);
  for (const [key, schema] of Object.entries(settingsSchemas)) {
    const result = schema.safeParse(profile[key]);
    expect(result.success, `${key}: ${result.error?.message}`).toBe(true);
  }
});

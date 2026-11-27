// @vitest-environment node
import { beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('server-only', () => ({}));
vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }));

// Fake Supabase client recording every table touched.
const touched = [];
const fakeDb = () => {
  const chain = new Proxy({}, {
    get: (_, prop) => (prop === 'then'
      ? (resolve) => resolve({ data: [], error: null })
      : () => chain),
  });
  return { from: (table) => { touched.push(table); return chain; } };
};

// Fake R2: records presign and delete calls.
const r2 = { presigned: [], deleted: [] };
vi.mock('@/lib/r2', () => ({
  presignPut: async (key) => { r2.presigned.push(key); return `https://r2.test/${key}?sig`; },
  deleteKeys: async (keys) => { r2.deleted.push(...keys); },
}));

const auth = { admin: false };
vi.mock('@/lib/admin/auth', () => ({
  requireAdmin: async () => {
    if (!auth.admin) throw new Error('Not allowed.');
    return fakeDb();
  },
}));

const projects = await import('@/app/admin/projects/actions');
const records = await import('@/app/admin/records');
const profile = await import('@/app/admin/profile/actions');
const media = await import('@/app/admin/media');

const form = (fields) => {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, typeof v === 'string' ? v : JSON.stringify(v));
  return f;
};

beforeEach(() => {
  auth.admin = false;
  touched.length = 0;
  r2.presigned.length = 0;
  r2.deleted.length = 0;
});

describe('every action refuses a non-admin before touching the database', () => {
  const calls = {
    saveProject: () => projects.saveProject(null, null, form({ title: 'x', slug: 'x' })),
    deleteProject: () => projects.deleteProject('id'),
    togglePublished: () => projects.togglePublished('id'),
    moveProject: () => projects.moveProject('id', 1),
    saveTimelineEntry: () => records.saveTimelineEntry('experiences', null, null, form({ period: 'p', title: 't' })),
    deleteTimelineEntry: () => records.deleteTimelineEntry('experiences', 'id'),
    moveTimelineEntry: () => records.moveTimelineEntry('formations', 'id', -1),
    savePerson: () => records.savePerson(null, null, form({ id: 'x', name: 'X' })),
    deletePerson: () => records.deletePerson('x'),
    saveGroup: () => records.saveGroup(null, null, form({ id: 'x', label: 'X' })),
    deleteGroup: () => records.deleteGroup('x'),
    moveGroup: () => records.moveGroup('x', 1),
    saveSetting: () => profile.saveSetting('cv', null, form({ cv: 'cv.pdf' })),
    getUploadUrl: () => media.getUploadUrl({ kind: 'image', scope: 'x', name: 'a.webp', type: 'image/webp', size: 10 }),
  };
  test.each(Object.keys(calls))('%s', async (name) => {
    await expect(calls[name]()).rejects.toThrow('Not allowed.');
    expect(touched).toEqual([]);
    expect(r2).toEqual({ presigned: [], deleted: [] });
  });
});

describe('as admin', () => {
  beforeEach(() => { auth.admin = true; });

  test('timeline actions only accept experiences and formations', async () => {
    await expect(records.deleteTimelineEntry('admins', 'id')).rejects.toThrow('Unknown table.');
    await expect(records.moveTimelineEntry('projects', 'id', 1)).rejects.toThrow('Unknown table.');
    expect(touched).toEqual([]);
  });

  test('upload URLs: only allowed types and sizes, keys in the right folder', async () => {
    const ok = await media.getUploadUrl({ kind: 'image', scope: 'R-Type', name: 'Écran titre.webp', type: 'image/webp', size: 1000 });
    expect(ok.key).toMatch(/^image\/R-Type\/Ecran-titre-[0-9a-f]{8}\.webp$/);
    expect(ok.url).toContain(ok.key);
    const scoped = await media.getUploadUrl({ kind: 'video', scope: '../../admins', name: 'x.mp4', type: 'video/mp4', size: 1000 });
    expect(scoped.key).toMatch(/^video\/admins\/x-[0-9a-f]{8}\.mp4$/);

    const refused = [
      { kind: 'image', type: 'text/html', size: 10 },
      { kind: 'image', type: 'image/svg+xml', size: 10 },
      { kind: 'document', type: 'application/pdf', size: 50 * 1024 * 1024 },
      { kind: 'video', type: 'video/mp4', size: 0 },
      { kind: 'other', type: 'image/png', size: 10 },
    ];
    for (const file of refused) {
      expect((await media.getUploadUrl({ scope: 'x', name: 'f', ...file })).error).toBeTruthy();
    }
    expect(r2.presigned).toHaveLength(2);
  });

  test('unknown settings key is refused', async () => {
    await expect(profile.saveSetting('admins', null, form({}))).rejects.toThrow('Unknown setting.');
  });

  test('an invalid project is not saved and the typed values come back', async () => {
    const state = await projects.saveProject(null, null, form({
      title: 'Mon projet', slug: 'mon projet', links: [{ label: 'Repo', url: 'pas une url', text: 'x' }],
    }));
    expect(state.fields).toMatchObject({ slug: expect.any(String), links: expect.any(String) });
    expect(state.values.title).toBe('Mon projet');
    expect(touched).toEqual([]);
  });

  test('an invalid person is not saved', async () => {
    const state = await records.savePerson(null, null, form({ id: 'Bad Id', name: '', url: 'nope' }));
    expect(Object.keys(state.fields)).toEqual(expect.arrayContaining(['id', 'name', 'url']));
    expect(touched).toEqual([]);
  });
});

// @vitest-environment node
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { NextRequest } from 'next/server';

// ─── Fakes ───────────────────────────────────────────────────────────────
const claims = { current: null };
vi.mock('@supabase/ssr', () => ({
  createServerClient: () => ({ auth: { getClaims: async () => ({ data: claims.current ? { claims: claims.current } : null }) } }),
}));

const admin = { current: { user: null, isAdmin: false } };
const signIn = vi.fn();
vi.mock('@/lib/supabase/server', () => ({
  getAdmin: async () => admin.current,
  createClient: async () => ({ auth: { signInWithPassword: signIn, signOut: vi.fn() } }),
}));

const { proxy, config } = await import('@/proxy');
const { default: AdminLayout } = await import('@/app/admin/layout');
const { login } = await import('@/app/login/actions');

// redirect() throws an error whose digest holds the target.
const redirectOf = (promise) => promise.then(() => null, (e) => e.digest?.split(';')[2] ?? e);
// Whether a rendered JSX tree contains `text` somewhere in its children.
function contains(node, text) {
  if (node === text) return true;
  if (Array.isArray(node)) return node.some((child) => contains(child, text));
  return node?.props?.children !== undefined && contains(node.props.children, text);
}
const form = (fields) => Object.entries(fields).reduce((f, [k, v]) => (f.append(k, v), f), new FormData());

beforeEach(() => {
  claims.current = null;
  admin.current = { user: null, isAdmin: false };
  signIn.mockReset();
});

// ─── Proxy ───────────────────────────────────────────────────────────────
describe('proxy', () => {
  test('only runs on /admin and /login', () => {
    expect(config.matcher).toEqual(['/admin/:path*', '/login']);
  });

  test('sends visitors without a session from /admin to /login', async () => {
    const res = await proxy(new NextRequest('http://site.test/admin/projects'));
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toBe('http://site.test/login');
  });

  test('lets a session through to /admin', async () => {
    claims.current = { sub: 'user-1' };
    const res = await proxy(new NextRequest('http://site.test/admin'));
    expect(res.headers.get('location')).toBeNull();
  });

  test('lets visitors reach /login', async () => {
    const res = await proxy(new NextRequest('http://site.test/login'));
    expect(res.headers.get('location')).toBeNull();
  });
});

// ─── Admin layout (server-side gate) ─────────────────────────────────────
describe('admin layout', () => {
  test('no session → /login', async () => {
    expect(await redirectOf(AdminLayout({ children: 'secret' }))).toBe('/login');
  });

  test('logged in but not in admins → /login', async () => {
    admin.current = { user: { id: 'u', email: 'a@b.c' }, isAdmin: false };
    expect(await redirectOf(AdminLayout({ children: 'secret' }))).toBe('/login');
  });

  test('admin → renders the page', async () => {
    admin.current = { user: { id: 'u', email: 'a@b.c' }, isAdmin: true };
    const tree = await AdminLayout({ children: 'secret' });
    expect(contains(tree, 'secret')).toBe(true);
  });
});

// ─── Login action ────────────────────────────────────────────────────────
describe('login action', () => {
  test('asks for both fields', async () => {
    expect(await login(null, form({ email: 'a@b.c' }))).toMatchObject({ error: expect.any(String) });
    expect(signIn).not.toHaveBeenCalled();
  });

  test('wrong credentials → one generic message, email kept', async () => {
    signIn.mockResolvedValue({ error: { message: 'Invalid login credentials' } });
    expect(await login(null, form({ email: ' a@b.c ', password: 'x' })))
      .toEqual({ error: 'Email ou mot de passe incorrect.', email: 'a@b.c' });
  });

  test('success → /admin', async () => {
    signIn.mockResolvedValue({ error: null });
    expect(await redirectOf(login(null, form({ email: 'a@b.c', password: 'x' })))).toBe('/admin');
  });
});

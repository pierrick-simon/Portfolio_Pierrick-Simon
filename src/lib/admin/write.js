import 'server-only';
import { revalidatePath } from 'next/cache';

// After any change: refresh every public page (home, project pages, sitemap)
// on their next visit, plus the admin screens. Simpler than tracking which
// page shows what, and the site only has ~25 pages.
export function refreshSite() {
  revalidatePath('/', 'layout');
}

export async function check(label, request) {
  const { data, error } = await request;
  if (error) throw new Error(`${label}: ${error.message}`);
  return data;
}

// Move a row one step up (-1) or down (+1) in its list, then renumber the
// list 0..n so positions stay clean. `scope` limits the list, e.g. projects
// of one group: { column: 'group_id', value: 'tek3' }.
export async function move(supabase, table, key, id, direction, scope) {
  let query = supabase.from(table).select(`${key}, position`).order('position').order(key);
  if (scope) query = scope.value == null ? query.is(scope.column, null) : query.eq(scope.column, scope.value);
  const rows = await check(table, query);

  const from = rows.findIndex((r) => String(r[key]) === String(id));
  const to = from + direction;
  if (from < 0 || to < 0 || to >= rows.length) return;
  [rows[from], rows[to]] = [rows[to], rows[from]];

  await Promise.all(rows.map((row, position) => (row.position === position
    ? null
    : check(table, supabase.from(table).update({ position }).eq(key, row[key])))));
}

// Position for a new row at the end of its list.
export async function nextPosition(supabase, table, scope) {
  let query = supabase.from(table).select('position').order('position', { ascending: false }).limit(1);
  if (scope) query = scope.value == null ? query.is(scope.column, null) : query.eq(scope.column, scope.value);
  const rows = await check(table, query);
  return rows.length ? rows[0].position + 1 : 0;
}

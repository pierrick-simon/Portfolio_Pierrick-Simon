'use server';

// Server Actions for the simple lists: experiences, formations, people, groups.
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/auth';
import { field, json } from '@/lib/admin/form';
import { formErrors, groupSchema, personSchema, timelineSchema } from '@/lib/admin/schemas';
import { check, move, nextPosition, refreshSite } from '@/lib/admin/write';

// Bound arguments come from the browser: only these tables can be targeted.
const TIMELINES = { experiences: '/admin/experiences', formations: '/admin/formations' };
const timelinePath = (table) => {
  if (!TIMELINES[table]) throw new Error('Unknown table.');
  return TIMELINES[table];
};

const done = (path, toast) => {
  refreshSite();
  redirect(`${path}?toast=${toast}`);
};

// ─── Experiences and formations ──────────────────────────────────────────

export async function saveTimelineEntry(table, id, _previousState, formData) {
  const path = timelinePath(table);
  const supabase = await requireAdmin();
  const values = { period: field(formData, 'period'), title: field(formData, 'title'), bullets: json(formData, 'bullets') };
  const parsed = timelineSchema.safeParse(values);
  if (!parsed.success) return { ...formErrors(parsed.error), values };

  if (id) {
    await check(table, supabase.from(table).update(parsed.data).eq('id', id));
  } else {
    const position = await nextPosition(supabase, table);
    await check(table, supabase.from(table).insert({ ...parsed.data, position }));
  }
  done(path, id ? 'saved' : 'created');
}

export async function deleteTimelineEntry(table, id) {
  const path = timelinePath(table);
  const supabase = await requireAdmin();
  await check(table, supabase.from(table).delete().eq('id', id));
  done(path, 'deleted');
}

export async function moveTimelineEntry(table, id, direction) {
  timelinePath(table);
  const supabase = await requireAdmin();
  await move(supabase, table, 'id', id, direction);
  refreshSite();
}

// ─── People ──────────────────────────────────────────────────────────────

export async function savePerson(existingId, _previousState, formData) {
  const supabase = await requireAdmin();
  const values = { id: existingId ?? field(formData, 'id'), name: field(formData, 'name'), url: field(formData, 'url') };
  const parsed = personSchema.safeParse(values);
  if (!parsed.success) return { ...formErrors(parsed.error), values };

  const { id, ...person } = parsed.data;
  if (existingId) {
    await check('people', supabase.from('people').update(person).eq('id', existingId));
  } else {
    const { error } = await supabase.from('people').insert({ id, ...person });
    if (error?.code === '23505') return { error: 'Certains champs sont invalides.', fields: { id: 'Cet identifiant existe déjà.' }, values };
    if (error) return { error: error.message, values };
  }
  done('/admin/people', existingId ? 'saved' : 'created');
}

export async function deletePerson(id) {
  const supabase = await requireAdmin();
  await check('people', supabase.from('people').delete().eq('id', id));
  done('/admin/people', 'deleted');
}

// ─── Project groups ──────────────────────────────────────────────────────

export async function saveGroup(existingId, _previousState, formData) {
  const supabase = await requireAdmin();
  const values = { id: existingId ?? field(formData, 'id'), label: field(formData, 'label') };
  const parsed = groupSchema.safeParse(values);
  if (!parsed.success) return { ...formErrors(parsed.error), values };

  if (existingId) {
    await check('project_groups', supabase.from('project_groups').update({ label: parsed.data.label }).eq('id', existingId));
  } else {
    const position = await nextPosition(supabase, 'project_groups');
    const { error } = await supabase.from('project_groups').insert({ ...parsed.data, position });
    if (error?.code === '23505') return { error: 'Certains champs sont invalides.', fields: { id: 'Cet identifiant existe déjà.' }, values };
    if (error) return { error: error.message, values };
  }
  done('/admin/groups', existingId ? 'saved' : 'created');
}

export async function deleteGroup(id) {
  const supabase = await requireAdmin();
  await check('project_groups', supabase.from('project_groups').delete().eq('id', id));
  done('/admin/groups', 'deleted');
}

export async function moveGroup(id, direction) {
  const supabase = await requireAdmin();
  await move(supabase, 'project_groups', 'id', id, direction);
  refreshSite();
}

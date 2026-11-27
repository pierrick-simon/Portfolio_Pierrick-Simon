'use server';

import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/auth';
import { checkbox, commaList, field, json, parseDocs } from '@/lib/admin/form';
import { formErrors, projectSchema } from '@/lib/admin/schemas';
import { check, move, nextPosition, refreshSite } from '@/lib/admin/write';

// Raw form values, sent back on error so the form keeps what was typed.
function readForm(formData) {
  return {
    title: field(formData, 'title'),
    slug: field(formData, 'slug'),
    note: field(formData, 'note'),
    team: field(formData, 'team'),
    duration: field(formData, 'duration'),
    period: field(formData, 'period'),
    stack: field(formData, 'stack'),
    group_id: field(formData, 'group_id'),
    summary: field(formData, 'summary'),
    features: json(formData, 'features'),
    skills: json(formData, 'skills'),
    cover_url: field(formData, 'cover_url'),
    gallery: json(formData, 'gallery'),
    video_url: field(formData, 'video_url'),
    docs: field(formData, 'docs'),
    links: json(formData, 'links'),
    href: field(formData, 'href'),
    contributors: json(formData, 'contributors'),
    published: checkbox(formData, 'published'),
  };
}

// Create (id = null) or update a project. Used with useActionState.
export async function saveProject(id, _previousState, formData) {
  const supabase = await requireAdmin();
  const values = readForm(formData);
  const parsed = projectSchema.safeParse({
    ...values,
    stack: commaList(values.stack),
    docs: parseDocs(values.docs),
  });
  if (!parsed.success) return { ...formErrors(parsed.error), values };

  const { contributors, ...project } = parsed.data;

  let projectId = id;
  try {
    if (id) {
      const current = await check('projects', supabase.from('projects').select('group_id').eq('id', id).single());
      if (current.group_id !== project.group_id) {
        project.position = await nextPosition(supabase, 'projects', { column: 'group_id', value: project.group_id });
      }
      await check('projects', supabase.from('projects').update(project).eq('id', id));
    } else {
      project.position = await nextPosition(supabase, 'projects', { column: 'group_id', value: project.group_id });
      const created = await check('projects', supabase.from('projects').insert(project).select('id').single());
      projectId = created.id;
    }

    await check('contributors', supabase.from('project_contributors').delete().eq('project_id', projectId));
    if (contributors.length) {
      await check('contributors', supabase.from('project_contributors').insert(
        contributors.map((personId, position) => ({ project_id: projectId, person_id: personId, position }))
      ));
    }
  } catch (error) {
    if (/duplicate key|projects_slug_key/.test(error.message)) {
      return { error: 'Certains champs sont invalides.', fields: { slug: 'Ce slug est déjà utilisé.' }, values };
    }
    return { error: `Erreur lors de l’enregistrement : ${error.message}`, values };
  }

  refreshSite();
  redirect(`/admin/projects?toast=${id ? 'saved' : 'created'}`);
}

export async function deleteProject(id) {
  const supabase = await requireAdmin();
  await check('projects', supabase.from('projects').delete().eq('id', id));
  refreshSite();
  redirect('/admin/projects?toast=deleted');
}

export async function togglePublished(id) {
  const supabase = await requireAdmin();
  const { published } = await check('projects', supabase.from('projects').select('published').eq('id', id).single());
  await check('projects', supabase.from('projects').update({ published: !published }).eq('id', id));
  refreshSite();
}

export async function moveProject(id, direction) {
  const supabase = await requireAdmin();
  const { group_id: group } = await check('projects', supabase.from('projects').select('group_id').eq('id', id).single());
  await move(supabase, 'projects', 'id', id, direction, { column: 'group_id', value: group });
  refreshSite();
}

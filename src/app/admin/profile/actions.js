'use server';

import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/auth';
import { commaList, field, json } from '@/lib/admin/form';
import { formErrors, settingsSchemas } from '@/lib/admin/schemas';
import { check, refreshSite } from '@/lib/admin/write';

// FormData → value of one `settings` key, before validation.
const readers = {
  header: (f) => ({ title: field(f, 'title'), subtitle: field(f, 'subtitle') }),
  about: (f) => ({
    paragraphs: json(f, 'paragraphs'),
    missionsTitle: field(f, 'missionsTitle'),
    missions: json(f, 'missions'),
    previous: { label: field(f, 'previousLabel'), text: field(f, 'previousText') },
  }),
  facts: (f) => json(f, 'facts'),
  skills: (f) => json(f, 'skills').map((g) => ({ label: g.label ?? '', items: commaList(g.items) })),
  cv: (f) => field(f, 'cv'),
  contact: (f) => json(f, 'contact'),
};

export async function saveSetting(key, _previousState, formData) {
  const schema = settingsSchemas[key];
  if (!schema) throw new Error('Unknown setting.');
  const supabase = await requireAdmin();

  const parsed = schema.safeParse(readers[key](formData));
  if (!parsed.success) return formErrors(parsed.error);

  await check('settings', supabase.from('settings').upsert({ key, value: parsed.data }));
  refreshSite();
  redirect('/admin/profile?toast=saved');
}

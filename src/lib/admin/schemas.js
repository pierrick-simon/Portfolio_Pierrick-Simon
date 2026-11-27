// Validation of everything the admin can save (zod). Runs on the server, every time.
import { z } from 'zod';

const text = (max = 500) => z.string().trim().max(max);
const required = (label, max = 500) => text(max).min(1, `${label} est obligatoire.`);
// Empty optional fields are stored as null.
const optional = (max = 500) => text(max).transform((v) => v || null);
const url = z.string().trim().url('URL invalide.').max(500);
const optionalUrl = z.union([z.literal('').transform(() => null), url]);
const lines = (max = 1000) => z.array(text(max)).transform((list) => list.filter(Boolean));

// Slugs become URLs: letters, digits, "-" and "_" only.
export const slugSchema = z.string().trim()
  .min(1, 'Le slug est obligatoire.')
  .max(80)
  .regex(/^[A-Za-z0-9][A-Za-z0-9_-]*$/, 'Lettres, chiffres, « - » et « _ » uniquement.')
  .refine((s) => !['admin', 'login', 'sitemap.xml', 'api'].includes(s.toLowerCase()), 'Ce slug est réservé.');

export const idSchema = z.string().trim()
  .min(1, 'L’identifiant est obligatoire.')
  .max(40)
  .regex(/^[a-z0-9][a-z0-9_-]*$/, 'Minuscules, chiffres, « - » et « _ » uniquement.');

const link = z.object({ label: required('Le libellé'), url, text: required('Le texte du lien') });
const docGroup = z.object({ title: required('Le titre du groupe'), items: lines() });

export const projectSchema = z.object({
  title: required('Le titre', 120),
  slug: slugSchema,
  note: optional(200),
  team: optional(80),
  duration: optional(80),
  period: optional(80),
  stack: lines(60),
  group_id: z.string().trim().transform((v) => v || null),
  summary: optional(5000),
  features: lines(),
  skills: lines(),
  cover_url: optional(),
  gallery: lines(),
  video_url: optional(),
  docs: z.array(docGroup).transform((d) => (d.length ? d : null)),
  links: z.array(link),
  href: optional(200),
  contributors: z.array(idSchema).transform((ids) => [...new Set(ids)]),
  published: z.boolean(),
});

export const timelineSchema = z.object({
  period: required('La période', 80),
  title: required('Le titre', 200),
  bullets: lines(),
});

export const personSchema = z.object({
  id: idSchema,
  name: required('Le nom', 120),
  url: optionalUrl,
});

export const groupSchema = z.object({
  id: idSchema,
  label: required('Le libellé', 120),
});

// One schema per `settings` key.
export const settingsSchemas = {
  header: z.object({ title: required('Le titre', 120), subtitle: text(200) }),
  about: z.object({
    paragraphs: lines(2000),
    missionsTitle: text(120),
    missions: lines(),
    previous: z.object({ label: text(120), text: text(2000) }),
  }),
  facts: z.array(z.object({ label: required('Le libellé', 80), value: required('La valeur', 200) })),
  skills: z.array(z.object({ label: required('Le libellé', 80), items: lines(60) })),
  cv: required('Le fichier du CV', 300),
  contact: z.array(z.object({
    icon: z.enum(['mail', 'phone', 'linkedin', 'github']),
    text: required('Le texte', 200),
    url: z.union([z.literal('').transform(() => undefined), z.string().trim().max(300)]).optional(),
  })),
};

// Zod error → { field: "first message" } for the form, plus one summary line.
export function formErrors(error) {
  const fields = {};
  for (const issue of error.issues) {
    const key = issue.path[0] ?? 'form';
    fields[key] ??= issue.message;
  }
  return { error: 'Certains champs sont invalides.', fields };
}

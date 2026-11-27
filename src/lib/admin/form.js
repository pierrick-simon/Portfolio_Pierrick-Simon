// Helpers turning FormData from the admin forms into plain values.

export const field = (formData, name) => String(formData.get(name) ?? '');

export const checkbox = (formData, name) => formData.get(name) === 'on';

// ListEditor sends its rows as JSON in a hidden input.
export function json(formData, name, fallback = []) {
  try {
    const value = JSON.parse(field(formData, name) || 'null');
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

// "a, b , c" → ["a", "b", "c"]
export const commaList = (value) => String(value ?? '').split(',').map((s) => s.trim()).filter(Boolean);

// URL slug from a title: accents removed, spaces → "-", case kept (e.g. "Start Trek" → "Start-Trek").
export function slugify(title) {
  return String(title ?? '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .trim()
    .replace(/[^A-Za-z0-9_-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^[-_]+|[-_]+$/g, '');
}

// API reference text ↔ docs groups.
//   ## CSV Handling
//   `df_read_csv(filename, separator)` - Read a CSV file.
export function parseDocs(textValue) {
  const groups = [];
  for (const raw of String(textValue ?? '').split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('## ')) groups.push({ title: line.slice(3).trim(), items: [] });
    else if (groups.length) groups.at(-1).items.push(line);
    else groups.push({ title: 'Documentation', items: [line] });
  }
  return groups;
}

export function formatDocs(docs) {
  return (docs ?? []).map((g) => [`## ${g.title}`, ...g.items].join('\n')).join('\n\n');
}

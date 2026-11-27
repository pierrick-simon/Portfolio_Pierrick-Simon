import { getAdmin } from '@/lib/supabase/server';
import RecordForm from '@/components/admin/RecordForm';
import MoveButtons from '@/components/admin/MoveButtons';
import { deleteTimelineEntry, moveTimelineEntry, saveTimelineEntry } from './records';

const FIELDS = [
  { name: 'period', label: 'Période', type: 'period', required: true },
  { name: 'title', label: 'Titre', placeholder: 'Epitech - Assistant Pédagogique', required: true },
  { name: 'bullets', label: 'Points (optionnels)', type: 'list', addLabel: 'Point', placeholder: 'Détail' },
];

// Shared admin screen for the two timelines (experiences, formations).
export default async function TimelineAdmin({ table, title }) {
  const { supabase } = await getAdmin();
  const { data: entries, error } = await supabase.from(table).select('id, period, title, bullets').order('position');
  if (error) throw new Error(error.message);

  return (
    <div className='Section'>
      <h2>{title}</h2>
      <ul className='admin-list'>
        {entries.map((entry, i) => (
          <li key={entry.id} className='admin-item'>
            <span className='admin-item-title'>
              {entry.title}
              <small>{entry.period}</small>
            </span>
            <MoveButtons action={moveTimelineEntry.bind(null, table, entry.id)} first={i === 0} last={i === entries.length - 1} />
            <details>
              <summary>Modifier</summary>
              <RecordForm
                action={saveTimelineEntry.bind(null, table, entry.id)}
                fields={FIELDS}
                values={entry}
                onDelete={deleteTimelineEntry.bind(null, table, entry.id)}
                deleteMessage={`Supprimer « ${entry.title} » ?`}
              />
            </details>
          </li>
        ))}
      </ul>
      <h3>Ajouter</h3>
      {/* key: a fresh empty form after each creation */}
      <RecordForm key={entries.length} action={saveTimelineEntry.bind(null, table, null)} fields={FIELDS} submitLabel='Ajouter' />
    </div>
  );
}

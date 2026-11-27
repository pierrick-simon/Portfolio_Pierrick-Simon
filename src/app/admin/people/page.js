import { getAdmin } from '@/lib/supabase/server';
import RecordForm from '@/components/admin/RecordForm';
import { ConfirmButton } from '@/components/admin/Buttons';
import { deletePerson, savePerson } from '../records';

export const metadata = { title: 'Contributeurs' };

const fields = (existing) => [
  {
    name: 'id', label: 'Identifiant', placeholder: 'ariel', required: true, readOnly: existing,
    hint: existing ? 'Ne peut pas être modifié.' : 'Minuscules, utilisé en interne.',
  },
  { name: 'name', label: 'Nom', placeholder: 'Ariel Amriou', required: true },
  { name: 'url', label: 'LinkedIn (ou autre lien)', type: 'url', placeholder: 'https://www.linkedin.com/in/…' },
];

export default async function PeoplePage() {
  const { supabase } = await getAdmin();
  const { data: people, error } = await supabase
    .from('people').select('id, name, url, project_contributors(count)').order('name');
  if (error) throw new Error(error.message);

  return (
    <div className='Section'>
      <h2>Contributeurs</h2>
      <ul className='admin-list'>
        {people.map((person) => {
          const projects = person.project_contributors[0]?.count ?? 0;
          return (
            <li key={person.id} className='admin-item'>
              <span className='admin-item-title'>
                {person.name}
                <small>{person.id} · {projects} projet{projects > 1 ? 's' : ''}</small>
              </span>
              <details>
                <summary>Modifier</summary>
                <RecordForm action={savePerson.bind(null, person.id)} fields={fields(true)} values={person} />
                <form action={deletePerson.bind(null, person.id)}>
                  <ConfirmButton message={`Supprimer ${person.name} ? Il sera aussi retiré de ${projects} projet(s).`} />
                </form>
              </details>
            </li>
          );
        })}
      </ul>
      <h3>Ajouter</h3>
      <RecordForm key={people.length} action={savePerson.bind(null, null)} fields={fields(false)} submitLabel='Ajouter' />
    </div>
  );
}

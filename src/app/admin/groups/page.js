import { getAdmin } from '@/lib/supabase/server';
import RecordForm from '@/components/admin/RecordForm';
import MoveButtons from '@/components/admin/MoveButtons';
import { ConfirmButton } from '@/components/admin/Buttons';
import { deleteGroup, moveGroup, saveGroup } from '../records';

export const metadata = { title: 'Groupes' };

const fields = (existing) => [
  {
    name: 'id', label: 'Identifiant', placeholder: 'tek4', required: true, readOnly: existing,
    hint: existing ? 'Ne peut pas être modifié.' : 'Minuscules, utilisé en interne.',
  },
  { name: 'label', label: 'Libellé affiché', placeholder: '~/projets/tek4 · 2027-2028', required: true },
];

export default async function GroupsPage() {
  const { supabase } = await getAdmin();
  const { data: groups, error } = await supabase
    .from('project_groups').select('id, label, projects(count)').order('position');
  if (error) throw new Error(error.message);

  return (
    <div className='Section'>
      <h2>Groupes de projets</h2>
      <p className='admin-hint'>Les sections de « Mes Projets » sur l’accueil, dans cet ordre.</p>
      <ul className='admin-list'>
        {groups.map((group, i) => {
          const projects = group.projects[0]?.count ?? 0;
          return (
            <li key={group.id} className='admin-item'>
              <span className='admin-item-title'>
                {group.label}
                <small>{group.id} · {projects} projet{projects > 1 ? 's' : ''}</small>
              </span>
              <MoveButtons action={moveGroup.bind(null, group.id)} first={i === 0} last={i === groups.length - 1} />
              <details>
                <summary>Modifier</summary>
                <RecordForm action={saveGroup.bind(null, group.id)} fields={fields(true)} values={group} />
                <form action={deleteGroup.bind(null, group.id)}>
                  <ConfirmButton
                    message={`Supprimer le groupe « ${group.label} » ? Ses ${projects} projet(s) seront conservés mais masqués de l’accueil jusqu’à ce que tu leur choisisses un autre groupe.`}
                  />
                </form>
              </details>
            </li>
          );
        })}
      </ul>
      <h3>Ajouter</h3>
      <RecordForm key={groups.length} action={saveGroup.bind(null, null)} fields={fields(false)} submitLabel='Ajouter' />
    </div>
  );
}

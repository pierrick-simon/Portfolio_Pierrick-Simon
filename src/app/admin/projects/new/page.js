import { getAdmin } from '@/lib/supabase/server';
import ProjectForm from '../ProjectForm';
import { formOptions } from '../options';

export const metadata = { title: 'Nouveau projet' };

export default async function NewProjectPage() {
  const { supabase } = await getAdmin();
  const { groups, people } = await formOptions(supabase);

  return (
    <div className='Section'>
      <h2>Nouveau projet</h2>
      <ProjectForm project={null} groups={groups} people={people} />
    </div>
  );
}

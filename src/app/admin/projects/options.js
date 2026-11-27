// Groups and people offered by the project form.
export async function formOptions(supabase) {
  const [groups, people] = await Promise.all([
    supabase.from('project_groups').select('id, label').order('position'),
    supabase.from('people').select('id, name').order('name'),
  ]);
  if (groups.error || people.error) throw new Error((groups.error ?? people.error).message);
  return { groups: groups.data, people: people.data };
}

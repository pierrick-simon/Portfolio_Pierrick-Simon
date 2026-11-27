import Header from '@/components/Header';
import SectionNav from '@/components/SectionNav';
import { About, Projects, Timeline, Cv, Contact } from '@/components/HomeSections';
import { getProfile, getProjectGroups, getExperiences, getFormations } from '@/lib/data';

// Pages are pre-rendered, then refreshed from Supabase at most once an hour.
// (Phase 6: the admin will also refresh them right after each save.)
export const revalidate = 3600;

const links = [
  { hash: 'about', label: 'À propos' },
  { hash: 'project', label: 'Projets' },
  { hash: 'formation', label: 'Formation' },
  { hash: 'experience', label: 'Experience' },
  { hash: 'cv', label: 'CV' },
  { hash: 'contact', label: 'Contact' },
];

export default async function HomePage() {
  const [profile, groups, formations, experiences] = await Promise.all([
    getProfile(),
    getProjectGroups(),
    getFormations(),
    getExperiences(),
  ]);

  return (
    <>
      <Header title={profile.header.title} subtitle={profile.header.subtitle} />
      <SectionNav links={links} />
      <main>
        <About profile={profile} />
        <Projects groups={groups} />
        <Timeline id='formation' title='Mes Formations' entries={formations} />
        <Timeline id='experience' title='Mes Experiences' entries={experiences} />
        <Cv file={profile.cv} />
        <Contact contact={profile.contact} />
      </main>
    </>
  );
}

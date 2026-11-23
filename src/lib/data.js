// Single entry point for site content. Pages only talk to these functions,
// so Phase 4 can switch them to Supabase without touching the pages.
// They are async on purpose: the database version will be.
import { projects } from '@/data/projects';
import { groups } from '@/data/groups';
import { people } from '@/data/people';
import { experiences } from '@/data/experiences';
import { formations } from '@/data/formations';
import { profile } from '@/data/profile';

const withContributors = (project) => ({
  ...project,
  contributors: (project.contributors || []).map((id) => ({ id, ...people[id] })),
});

// Published projects, grouped and ordered for the home page.
export async function getProjectGroups() {
  return groups.map((group) => ({
    ...group,
    projects: projects
      .filter((p) => p.group === group.id && p.published)
      .sort((a, b) => a.order - b.order),
  }));
}

// Projects that have their own page (cards with a custom `href` don't).
export async function getProjectSlugs() {
  return projects.filter((p) => p.published && !p.href).map((p) => p.slug);
}

// Case-insensitive, so old URLs like /NanoTekspice still resolve.
export async function getProject(slug = '') {
  const wanted = decodeURIComponent(slug).toLowerCase();
  const project = projects.find((p) => p.published && !p.href && p.slug.toLowerCase() === wanted);
  return project ? withContributors(project) : null;
}

export async function getExperiences() {
  return experiences;
}

export async function getFormations() {
  return formations;
}

export async function getProfile() {
  return profile;
}

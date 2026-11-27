import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';
import ProjectPage, { generateMetadata, generateStaticParams } from '@/app/[slug]/page';
import { getProject } from '@/lib/data';
import { projects } from '@/data/projects';

// Render the pages from src/data/ so these tests don't need the network.
vi.mock('@/lib/data', () => import('./localData'));

// Server components are async functions: await them, then render their output.
const renderProject = async (slug) => render(await ProjectPage({ params: Promise.resolve({ slug }) }));
// notFound() and permanentRedirect() throw errors carrying a digest Next.js understands.
const digestOf = (promise) => promise.then(() => null, (error) => error.digest);

const slugs = projects.filter((p) => !p.href).map((p) => p.slug);

test('home page lists every published project', async () => {
  render(await HomePage());
  projects
    .filter((p) => p.published)
    .forEach((p) => expect(screen.getByRole('heading', { level: 4, name: p.title })).toBeInTheDocument());
});

describe('project pages', () => {
  test('every project with its own page is pre-rendered', async () => {
    expect((await generateStaticParams()).map((p) => p.slug).sort()).toEqual([...slugs].sort());
  });

  test.each(slugs)('/%s renders its title, summary and contributors', async (slug) => {
    const project = await getProject(slug);
    await renderProject(slug);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(project.title);
    expect(screen.getByText(project.summary, { exact: false })).toBeInTheDocument();
    project.contributors.forEach((person) => expect(screen.getByText(person.name)).toBeInTheDocument());
  });

  test('old casing /NanoTekspice redirects to /NanoTekSpice', async () => {
    expect(await digestOf(ProjectPage({ params: Promise.resolve({ slug: 'NanoTekspice' }) })))
      .toMatch(/^NEXT_REDIRECT;replace;\/NanoTekSpice;308;/);
  });

  test.each(['does-not-exist', 'Portfolio'])('/%s is a 404', async (slug) => {
    expect(await digestOf(ProjectPage({ params: Promise.resolve({ slug }) }))).toMatch(/NEXT_HTTP_ERROR_FALLBACK;404/);
  });

  test('metadata uses the project title, summary and cover', async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ slug: 'MyPGP' }) });
    expect(meta.title).toBe('MyPGP');
    expect(meta.description.length).toBeLessThanOrEqual(160);
    expect(meta.openGraph.images[0].url).toBe('/MyPGP.png');
  });
});

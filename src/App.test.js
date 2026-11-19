import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { projects } from './data/projects';
import { people } from './data/people';

beforeAll(() => {
  window.IntersectionObserver = class {
    observe() {}
    disconnect() {}
  };
  window.HTMLMediaElement.prototype.load = () => {};
});

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );

test('home page lists every published project', () => {
  renderAt('/');
  projects
    .filter((p) => p.published)
    .forEach((p) => expect(screen.getByRole('heading', { level: 4, name: p.title })).toBeInTheDocument());
});

test.each(projects.filter((p) => !p.href).map((p) => [p.slug, p]))('/%s renders its page', (slug, project) => {
  renderAt(`/${slug}`);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(project.title);
  expect(screen.getByText(project.summary, { exact: false })).toBeInTheDocument();
  project.contributors.forEach((id) => expect(screen.getAllByText(people[id].name).length).toBeGreaterThan(0));
});

test('old lowercase URL /NanoTekspice still works', () => {
  renderAt('/NanoTekspice');
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('NanoTekSpice');
});

test('unknown slug shows the 404 page', () => {
  renderAt('/does-not-exist');
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404');
});

test('opening a project from the home page scrolls to the top', () => {
  const scrollTo = jest.fn();
  window.scrollTo = scrollTo;
  renderAt('/');
  scrollTo.mockClear();
  fireEvent.click(screen.getByRole('heading', { level: 4, name: 'MyPGP' }));
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('MyPGP');
  expect(scrollTo).toHaveBeenCalledWith(0, 0);
});

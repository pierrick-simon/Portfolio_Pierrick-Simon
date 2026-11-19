import './../App.css';
import ProjectCard from './Component/ProjectCard';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { groups } from '../data/groups';
import { experiences } from '../data/experiences';
import { formations } from '../data/formations';

const icons = {
  mail: (
    <svg className='contact-icon' viewBox='0 0 24 24'><path d='M3 5h18v14H3z' /><path d='M3 6l9 7 9-7' /></svg>
  ),
  phone: (
    <svg className='contact-icon' viewBox='0 0 24 24'><path d='M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2C9.5 21 3 14.5 3 6a2 2 0 0 1 1-2z' /></svg>
  ),
  linkedin: (
    <svg className='contact-icon' viewBox='0 0 24 24'><rect x='3' y='3' width='18' height='18' rx='2' /><path d='M7 10v7M7 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 13v4' /></svg>
  ),
  github: (
    <svg className='contact-icon' viewBox='0 0 24 24'><path d='M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z' /></svg>
  ),
};

function About() {
  const { about, facts, skills } = profile;
  return (
    <div className='Section' id='about'>
      <h2 className='intro-animate'>À propos de moi</h2>

      <div className='about-grid'>
        <div className='about-bio'>
          <div className='Section_body'>
            {about.paragraphs.map((text) => <p key={text}>{text}</p>)}

            <h3>{about.missionsTitle}</h3>
            <ul>
              {about.missions.map((mission) => <li key={mission}>{mission}</li>)}
            </ul>
          </div>
        </div>

        <dl className='about-facts'>
          {facts.map((fact) => [
            <dt key={`${fact.label}-dt`}>{fact.label}</dt>,
            <dd key={`${fact.label}-dd`}>{fact.value}</dd>,
          ])}
        </dl>
      </div>

      <div className='Section_body'>
        {skills.map((group) => (
          <div className='skill-group' key={group.label}>
            <h4>{group.label}</h4>
            <div className='pill-row'>
              {group.items.map((item) => (
                <span className='pill' key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}

        <p style={{ marginTop: '1.25rem' }}>
          <strong>{about.previous.label}</strong> {about.previous.text}
        </p>
      </div>
    </div>
  );
}

function Project() {
  return (
    <div className='Section' id='project'>
      <h2>Mes Projets</h2>

      {groups.map((group) => (
        <div className='project-group' key={group.id}>
          <p className='group-label'>{group.label}</p>
          <div className='Section_body_projects'>
            {projects
              .filter((p) => p.group === group.id && p.published)
              .sort((a, b) => a.order - b.order)
              .map((p) => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

function Timeline({ id, title, entries }) {
  return (
    <div className='Section' id={id}>
      <h2>{title}</h2>
      <ul className='timeline'>
        {entries.map((entry) => (
          <li className='timeline-item' key={entry.title}>
            <span className='timeline-date'>{entry.period}</span>
            <h3>{entry.title}</h3>
            {entry.bullets.length > 0 && (
              <ul>
                {entry.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Cv() {
  return (
    <div className='Section' id='cv'>
      <h2>Mon CV</h2>
      <div className='Section_body'>
        <a href={profile.cv} className="btn" download>Télécharger le CV</a>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className='Section' id='contact'>
      <h2>Contact</h2>
      <ul className='contact-list'>
        {profile.contact.map((item) => (
          <li key={item.icon + item.text}>
            {icons[item.icon]}
            {item.url ? (
              <a
                href={item.url}
                {...(item.url.startsWith('http') && { target: '_blank', rel: 'noreferrer' })}
              >
                {item.text}
              </a>
            ) : (
              <span>{item.text}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Home() {
  return (
    <main>
      <About />
      <Project />
      <Timeline id='formation' title='Mes Formations' entries={formations} />
      <Timeline id='experience' title='Mes Experiences' entries={experiences} />
      <Cv />
      <Contact />
    </main>
  );
}

export default Home;

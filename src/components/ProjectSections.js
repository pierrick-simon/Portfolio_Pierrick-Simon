// Sections of a project page. A section is skipped when it has no content.
import InlineCode from './InlineCode';

export function List({ id, title, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className='Section' id={id}>
      <h2>{title}</h2>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

export function Docs({ docs }) {
  return (
    <ul className='demo_cuddle'>
      {docs.map((group) => (
        <li key={group.title}>
          <strong><InlineCode text={group.title} /></strong>
          <ul>
            {group.items.map((item) => <li key={item}><InlineCode text={item} /></li>)}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export function Links({ links = [], contributors = [] }) {
  return (
    <div className='Section' id='link'>
      <h2>Liens</h2>
      <div className='Section_body'>
        {links.map((link) => (
          <p key={link.url}>
            {link.label} : <a href={link.url} target='_blank' rel='noreferrer'>{link.text}</a>
          </p>
        ))}
        {contributors.length > 0 && (
          <div className='contributor'>
            Contributor :
            {contributors.map((person) => (
              <a key={person.id} href={person.url} target='_blank' rel='noreferrer'>{person.name}</a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

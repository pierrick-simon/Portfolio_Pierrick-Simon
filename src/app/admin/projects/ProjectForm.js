'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import ListEditor from '@/components/admin/ListEditor';
import { FieldError, FormError } from '@/components/admin/FormMessages';
import PeriodField from '@/components/admin/PeriodField';
import MediaInput from '@/components/admin/MediaInput';
import { ConfirmButton, SubmitButton } from '@/components/admin/Buttons';
import { slugify } from '@/lib/admin/form';
import { deleteProject, saveProject } from './actions';

// Create or edit a project. `project` is the database row (null = new).
function ProjectForm({ project, groups, people, docsText }) {
  const [state, action] = useActionState(saveProject.bind(null, project?.id ?? null), null);
  // After an error the form is reset to these values, so nothing typed is lost.
  const v = state?.values ?? {
    title: project?.title ?? '',
    slug: project?.slug ?? '',
    note: project?.note ?? '',
    team: project?.team ?? '',
    duration: project?.duration ?? '',
    period: project?.period ?? '',
    stack: (project?.stack ?? []).join(', '),
    group_id: project?.group_id ?? groups[0]?.id ?? '',
    summary: project?.summary ?? '',
    cover_url: project?.cover_url ?? '',
    video_url: project?.video_url ?? '',
    docs: docsText ?? '',
    href: project?.href ?? '',
    published: project?.published ?? false,
  };

  // New project: the slug follows the title until it's edited by hand.
  const [slug, setSlug] = useState(v.slug);
  const [slugTouched, setSlugTouched] = useState(Boolean(project));
  const err = (name) => <FieldError state={state} name={name} />;

  return (
    <form action={action} className='admin-form admin-form-wide'>
      <fieldset>
        <legend>Informations</legend>
        <div className='admin-grid'>
          <label>
            Titre *
            <input
              name='title'
              defaultValue={v.title}
              required
              onChange={(e) => { if (!slugTouched) setSlug(slugify(e.target.value)); }}
            />
            {err('title')}
          </label>
          <label>
            Slug (URL) *
            <input
              name='slug'
              value={slug}
              required
              onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
            />
            <span className='admin-hint'>pierricksimon.dev/{slug || '…'}</span>
            {err('slug')}
          </label>
          <label>
            Groupe
            <select name='group_id' defaultValue={v.group_id}>
              {groups.map((g) => <option key={g.id} value={g.id}>{g.label}</option>)}
              <option value=''>(aucun, masqué de l’accueil)</option>
            </select>
          </label>
          <label>
            Équipe
            <input name='team' defaultValue={v.team} placeholder='Duo, Trio, Groupe de 4…' />
          </label>
          <label>
            Durée
            <input name='duration' defaultValue={v.duration} placeholder='4 semaines' />
          </label>
          <label>
            Technologies
            <input name='stack' defaultValue={v.stack} placeholder='C++, Python' />
            <span className='admin-hint'>Séparées par des virgules.</span>
          </label>
          <label>
            Note après le titre
            <input name='note' defaultValue={v.note} placeholder=' - (généré avec GitHub Copilot)' />
          </label>
        </div>
        <PeriodField defaultValue={v.period} error={err('period')} />
        <label className='admin-check'>
          <input type='checkbox' name='published' defaultChecked={v.published} />
          Publié (visible sur le site)
        </label>
      </fieldset>

      <fieldset>
        <legend>Contenu</legend>
        <label>
          Présentation
          <textarea name='summary' defaultValue={v.summary} rows={6} />
        </label>
        <div>
          <span className='admin-hint'>Fonctionnalités clés</span>
          <ListEditor name='features' initial={project?.features ?? []} addLabel='Fonctionnalité' placeholder='Fonctionnalité' />
        </div>
        <div>
          <span className='admin-hint'>Compétences mises en pratique</span>
          <ListEditor name='skills' initial={project?.skills ?? []} addLabel='Compétence' placeholder='Compétence' />
        </div>
      </fieldset>

      <fieldset>
        <legend>Médias</legend>
        <p className='admin-hint'>
          « Envoyer… » met le fichier sur R2 (images converties en WebP). Tu peux aussi coller une URL.
          Les fichiers retirés sont supprimés du bucket à l’enregistrement.
        </p>
        <div className='admin-field'>
          <span>Image de couverture</span>
          <MediaInput name='cover_url' kind='image' scope={slug} defaultValue={v.cover_url} label='Image de couverture' placeholder='image/MyPGP/cover.webp' />
        </div>
        <div className='admin-field'>
          <span>Vidéo de démo (MP4, 100 Mo max)</span>
          <MediaInput name='video_url' kind='video' scope={slug} defaultValue={v.video_url} label='Vidéo de démo' placeholder='video/MyPGP/demo.mp4' />
        </div>
        <div>
          <span className='admin-hint'>Galerie (section Aperçu)</span>
          <ListEditor name='gallery' initial={project?.gallery ?? []} addLabel='Image' placeholder='Image' media={{ kind: 'image', scope: slug }} />
        </div>
      </fieldset>

      <fieldset>
        <legend>Liens et contributeurs</legend>
        <div>
          <span className='admin-hint'>Liens</span>
          <ListEditor
            name='links'
            initial={project?.links ?? []}
            addLabel='Lien'
            fields={[
              { key: 'label', label: 'Libellé', placeholder: 'Repo GitHub' },
              { key: 'url', label: 'URL', type: 'url', placeholder: 'https://github.com/…' },
              { key: 'text', label: 'Texte du lien', placeholder: 'MyPGP' },
            ]}
          />
          {err('links')}
        </div>
        <div>
          <span className='admin-hint'>Contributeurs (dans l’ordre d’affichage)</span>
          <ListEditor
            name='contributors'
            initial={project?.contributors ?? []}
            addLabel='Contributeur'
            placeholder='Contributeur'
            options={people.map((p) => ({ value: p.id, label: p.name }))}
          />
          {err('contributors')}
        </div>
      </fieldset>

      <details>
        <summary className='admin-hint'>Avancé</summary>
        <fieldset>
          <label>
            Lien personnalisé de la carte (pas de page projet)
            <input name='href' defaultValue={v.href} placeholder='#top' />
          </label>
          <label>
            Référence d’API (section Démo)
            <textarea name='docs' className='code' defaultValue={v.docs} placeholder={'## Groupe\n`fonction()` - description'} />
            <span className='admin-hint'>« ## Titre » commence un groupe, chaque ligne suivante est un élément. Le texte entre `backticks` devient du code.</span>
            {err('docs')}
          </label>
        </fieldset>
      </details>

      <FormError state={state} />
      <div className='admin-actions'>
        <SubmitButton>{project ? 'Enregistrer' : 'Créer le projet'}</SubmitButton>
        <Link href='/admin/projects'>Annuler</Link>
        {project && (
          <ConfirmButton
            className='btn btn-danger admin-actions-end'
            formAction={deleteProject.bind(null, project.id)}
            message={`Supprimer définitivement « ${project.title} » ?`}
          >
            Supprimer le projet
          </ConfirmButton>
        )}
      </div>
    </form>
  );
}

export default ProjectForm;

'use client';

import { useActionState } from 'react';
import ListEditor from '@/components/admin/ListEditor';
import MediaInput from '@/components/admin/MediaInput';
import { FormError } from '@/components/admin/FormMessages';
import { SubmitButton } from '@/components/admin/Buttons';
import { saveSetting } from './actions';

// One form per settings key, each saved on its own.
function SettingForm({ settingKey, title, children }) {
  const [state, action] = useActionState(saveSetting.bind(null, settingKey), null);
  return (
    <form action={action} className='admin-form admin-form-wide'>
      <fieldset>
        <legend>{title}</legend>
        {children}
        <FormError state={state} />
        <SubmitButton />
      </fieldset>
    </form>
  );
}

const ICONS = [
  { value: 'mail', label: 'Email' },
  { value: 'phone', label: 'Téléphone' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'github', label: 'GitHub' },
];

function ProfileForms({ profile }) {
  const { header = {}, about = {}, facts = [], skills = [], cv = '', contact = [] } = profile;

  return (
    <div className='admin-form admin-form-wide'>
      <SettingForm settingKey='header' title='En-tête'>
        <div className='admin-grid'>
          <label>Nom *<input name='title' defaultValue={header.title} required /></label>
          <label>Sous-titre<input name='subtitle' defaultValue={header.subtitle} /></label>
        </div>
      </SettingForm>

      <SettingForm settingKey='about' title='À propos de moi'>
        <div>
          <span className='admin-hint'>Paragraphes</span>
          <ListEditor name='paragraphs' initial={about.paragraphs ?? []} addLabel='Paragraphe' multiline />
        </div>
        <label>Titre de la liste<input name='missionsTitle' defaultValue={about.missionsTitle} /></label>
        <div>
          <span className='admin-hint'>Liste</span>
          <ListEditor name='missions' initial={about.missions ?? []} addLabel='Élément' />
        </div>
        <div className='admin-grid'>
          <label>Phrase finale : libellé<input name='previousLabel' defaultValue={about.previous?.label} /></label>
          <label>Phrase finale : texte<textarea name='previousText' defaultValue={about.previous?.text} rows={3} /></label>
        </div>
      </SettingForm>

      <SettingForm settingKey='facts' title='Encadré (Formation, Recherche…)'>
        <ListEditor
          name='facts'
          initial={facts}
          addLabel='Ligne'
          fields={[{ key: 'label', label: 'Libellé' }, { key: 'value', label: 'Valeur' }]}
        />
      </SettingForm>

      <SettingForm settingKey='skills' title='Compétences'>
        <ListEditor
          name='skills'
          initial={skills.map((g) => ({ label: g.label, items: g.items.join(', ') }))}
          addLabel='Groupe'
          fields={[
            { key: 'label', label: 'Groupe', placeholder: 'Développement' },
            { key: 'items', label: 'Compétences (séparées par des virgules)', placeholder: 'C++, Python', multiline: true },
          ]}
        />
      </SettingForm>

      <SettingForm settingKey='cv' title='CV'>
        <div className='admin-field'>
          <span>Fichier PDF *</span>
          <MediaInput name='cv' kind='document' scope='cv' defaultValue={cv} label='Fichier du CV' />
          <span className='admin-hint'>« Envoyer… » remplace le CV ; l’ancien fichier est supprimé du bucket à l’enregistrement.</span>
        </div>
      </SettingForm>

      <SettingForm settingKey='contact' title='Contact'>
        <ListEditor
          name='contact'
          initial={contact.map((c) => ({ icon: c.icon, text: c.text, url: c.url ?? '' }))}
          addLabel='Contact'
          fields={[
            { key: 'icon', label: 'Type', options: ICONS },
            { key: 'text', label: 'Texte affiché' },
            { key: 'url', label: 'Lien (optionnel)', placeholder: 'mailto:… ou https://…' },
          ]}
        />
      </SettingForm>
    </div>
  );
}

export default ProfileForms;

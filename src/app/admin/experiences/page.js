import TimelineAdmin from '../TimelineAdmin';

export const metadata = { title: 'Expériences' };

export default function ExperiencesPage() {
  return <TimelineAdmin table='experiences' title='Expériences' />;
}

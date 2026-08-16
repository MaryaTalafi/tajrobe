import { api } from '@/lib/data/mock';
import { notFound } from 'next/navigation';
import { EventDetailClient } from './EventDetailClient';

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await api.getEvent(id);
  
  if (!event) {
    notFound();
  }

  const ratings = await api.getRatings(event.id);

  return <EventDetailClient event={event} ratings={ratings} />;
}

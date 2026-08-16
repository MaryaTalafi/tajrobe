import { api, mockUsers } from '@/lib/data/mock';
import { AdminClient } from './AdminClient';

export default async function AdminPage() {
  const events = await api.getEvents();
  const categories = await api.getCategories();
  const users = mockUsers; // Directly passing mock users

  return <AdminClient users={users} events={events} categories={categories} />;
}

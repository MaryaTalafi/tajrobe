import { api, mockUsers } from '@/lib/data/mock';
import { Button, buttonVariants } from '@/components/ui/button';
import { Users, Edit, Plus, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default async function HostDashboardPage() {
  // Mock the host as u2
  const host = mockUsers[1];
  const allEvents = await api.getEvents();
  const myEvents = allEvents.filter(e => e.hostId === host.id);

  // Mock attendees
  const mockAttendees = [
    { id: 1, name: 'سارا احمدی', email: 'sara@example.com', date: '۱۴۰۲/۰۷/۱۵', status: 'پرداخت شده' },
    { id: 2, name: 'علی رضایی', email: 'ali@example.com', date: '۱۴۰۲/۰۷/۱۶', status: 'رایگان' },
    { id: 3, name: 'مریم حسینی', email: 'maryam@example.com', date: '۱۴۰۲/۰۷/۱۶', status: 'پرداخت شده' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">داشبورد میزبان</h1>
          <p className="text-muted-foreground">خوش آمدید، {host.name}</p>
        </div>
        <Link href="/host" className={buttonVariants({ className: "flex items-center gap-2" })}>
          <Plus className="w-4 h-4 shrink-0" />
          ایجاد تجربه جدید
        </Link>
      </div>

      <div className="space-y-12">
        {myEvents.map(event => (
          <div key={event.id} className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row p-6 gap-6 border-b">
              <div className="w-full md:w-64 shrink-0">
                <div className="aspect-[16/9] rounded-xl overflow-hidden bg-muted">
                  <img src={event.bannerUrl} alt={event.title} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      event.status === 'PUBLISHED' ? 'bg-success/10 text-success' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {event.status === 'PUBLISHED' ? 'منتشر شده' : 'پیش‌نویس'}
                    </span>
                    <Link href={`/events/${event.id}`} target="_blank" className={buttonVariants({ variant: "ghost", size: "sm", className: "flex items-center gap-2 text-primary hover:text-primary-700" })}>
                      مشاهده صفحه <ExternalLink className="w-4 h-4 shrink-0" />
                    </Link>
                  </div>
                  <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                  <div className="text-sm text-muted-foreground line-clamp-2" dangerouslySetInnerHTML={{ __html: event.description }} />
                </div>
                
                <div className="flex items-center gap-6 mt-4 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <span>{event.registrationCount} ثبت‌نامی</span>
                  </div>
                  <Link href={`/host?edit=${event.id}`} className={buttonVariants({ variant: "outline", size: "sm", className: "flex items-center gap-2" })}>
                    <Edit className="w-4 h-4 shrink-0" />
                    ویرایش تجربه
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Attendees list (mock) */}
            <div className="bg-neutral-50 p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" /> 
                لیست شرکت‌کنندگان (نمونه)
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-right">
                  <thead className="bg-neutral-100 text-neutral-500">
                    <tr>
                      <th className="px-4 py-3 rounded-r-lg font-medium">نام</th>
                      <th className="px-4 py-3 font-medium">ایمیل</th>
                      <th className="px-4 py-3 font-medium">تاریخ ثبت‌نام</th>
                      <th className="px-4 py-3 rounded-l-lg font-medium">وضعیت</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {mockAttendees.map((attendee, i) => (
                      <tr key={i} className="hover:bg-neutral-100/50 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground">{attendee.name}</td>
                        <td className="px-4 py-3 text-muted-foreground text-left" dir="ltr">{attendee.email}</td>
                        <td className="px-4 py-3 text-muted-foreground">{attendee.date}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            attendee.status === 'پرداخت شده' ? 'bg-success/10 text-success' : 'bg-primary-100 text-primary-700'
                          }`}>
                            {attendee.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import Link from 'next/link';
import { Event } from '@/types';
import { Calendar, MapPin, Video, PlayCircle } from 'lucide-react';
import Image from 'next/image';

export function EventCard({ event }: { event: Event }) {
  const isFree = event.price === null || event.price === 0;
  
  return (
    <Link href={`/events/${event.id}`} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
      <div className="group rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          <Image 
            src={event.bannerUrl} 
            alt={event.title}
            fill
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            {isFree ? (
              <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-md">رایگان</span>
            ) : (
              <span className="bg-accent-400 text-accent-foreground text-xs font-semibold px-2 py-1 rounded-md">
                {new Intl.NumberFormat('fa-IR').format(event.price!)} تومان
              </span>
            )}
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
          
          <div className="flex flex-col gap-2 mt-auto pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 shrink-0" />
              <span>
                {new Intl.DateTimeFormat('fa-IR', { 
                  day: 'numeric', month: 'long', year: 'numeric' 
                }).format(new Date(event.startDate))}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {event.mode === 'IN_PERSON' && <MapPin className="w-4 h-4 shrink-0" />}
              {event.mode === 'ONLINE' && <Video className="w-4 h-4 shrink-0" />}
              {event.mode === 'OFFLINE_RECORDED' && <PlayCircle className="w-4 h-4 shrink-0" />}
              <span>
                {event.mode === 'IN_PERSON' ? 'حضوری' : 
                 event.mode === 'ONLINE' ? 'آنلاین' : 'آفلاین (ضبط شده)'}
              </span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">
                {event.host?.name?.[0] || 'م'}
              </div>
              <span className="text-sm font-medium text-foreground">{event.host?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

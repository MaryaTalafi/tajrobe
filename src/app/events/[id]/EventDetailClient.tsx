"use client";

import { useState } from 'react';
import { Event, Rating } from '@/types';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Video, PlayCircle, Star, Heart, Clock, User, MessageCircle } from 'lucide-react';
import { OtpModal } from '@/components/OtpModal';
import Image from 'next/image';
import { toPersianDigits } from '@/lib/utils';

export function EventDetailClient({ event, ratings }: { event: Event, ratings: Rating[] }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const isFree = event.price === null || event.price === 0;

  const handleRegisterClick = () => {
    if (!isRegistered) {
      setIsOtpOpen(true);
    }
  };

  const handleFavoriteClick = () => {
    setIsOtpOpen(true);
  };

  const handleOtpSuccess = () => {
    setIsRegistered(true);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="rounded-2xl overflow-hidden aspect-[21/9] bg-muted relative border">
              <Image src={event.bannerUrl} alt={event.title} fill className="object-cover" priority />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  {event.category?.name}
                </span>
                {event.averageRating! > 0 && (
                  <div className="flex items-center gap-1 text-accent-600 bg-accent-100 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold">{toPersianDigits(event.averageRating!)}</span>
                  </div>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                {event.title}
              </h1>

              <div className="prose prose-neutral max-w-none text-muted-foreground leading-relaxed" 
                   dangerouslySetInnerHTML={{ __html: event.description }} />
            </div>

            <hr className="border-border" />

            {/* Ratings & Comments */}
            <div>
              <h2 className="text-2xl font-bold mb-6">نظرات تجربه‌گرایان</h2>
              {ratings.length > 0 ? (
                <div className="space-y-6">
                  {ratings.map(rating => (
                    <div key={rating.id} className="bg-neutral-50 p-6 rounded-xl border">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-100 text-primary flex items-center justify-center font-bold">
                            {rating.user?.name?.[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-foreground">{rating.user?.name}</span>
                              <span className="text-[11px] bg-primary-50 text-primary-600 px-2 py-0.5 rounded border border-primary-100">
                                این تجربه رو تجربه کرده
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Intl.DateTimeFormat('fa-IR').format(new Date(rating.createdAt))}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-1 text-accent-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < rating.score ? 'fill-current' : 'text-neutral-200'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-neutral-700 leading-relaxed">{rating.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-neutral-50 rounded-xl border border-dashed">
                  <MessageCircle className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                  <p className="text-muted-foreground">هنوز نظری برای این تجربه ثبت نشده است.</p>
                </div>
              )}
              
              {isRegistered && (
                <div className="mt-8 bg-white p-6 rounded-xl border shadow-sm">
                  <h3 className="font-bold text-lg mb-4">چطور بود؟ از تجربه‌ات بگو</h3>
                  <div className="flex gap-2 text-neutral-200 mb-4 cursor-pointer">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-8 h-8 hover:text-accent-400" />)}
                  </div>
                  <textarea 
                    className="w-full border rounded-lg p-3 min-h-[100px] mb-4 focus:ring-2 focus:ring-primary focus:outline-none" 
                    placeholder="نظرت رو اینجا بنویس..."
                  ></textarea>
                  <Button>ثبت نظر</Button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border rounded-2xl p-6 shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-foreground">
                  {isFree ? 'رایگان' : `${new Intl.NumberFormat('fa-IR').format(event.price!)} تومان`}
                </span>
                <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-accent-600" onClick={handleFavoriteClick}>
                  <Heart className={`w-6 h-6 ${isFavorite ? 'fill-accent-600 text-accent-600' : ''}`} />
                </Button>
              </div>

              <div className="flex flex-col gap-4 text-sm text-neutral-700">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground">تاریخ برگزاری</div>
                    <div className="text-muted-foreground mt-1">
                      {new Intl.DateTimeFormat('fa-IR', { 
                        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
                      }).format(new Date(event.startDate))}
                    </div>
                  </div>
                </div>

                {event.hasTime && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">زمان</div>
                      <div className="text-muted-foreground mt-1">
                        {new Intl.DateTimeFormat('fa-IR', { hour: '2-digit', minute: '2-digit' }).format(new Date(event.startDate))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  {event.mode === 'IN_PERSON' && <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />}
                  {event.mode === 'ONLINE' && <Video className="w-5 h-5 text-primary shrink-0 mt-0.5" />}
                  {event.mode === 'OFFLINE_RECORDED' && <PlayCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />}
                  
                  <div className="w-full">
                    <div className="font-medium text-foreground">
                      {event.mode === 'IN_PERSON' ? 'محل برگزاری' : 
                       event.mode === 'ONLINE' ? 'لینک ورود' : 'لینک دسترسی'}
                    </div>
                    <div className="text-muted-foreground mt-1">
                      {!isRegistered ? (
                        <div className="bg-neutral-100 p-2 rounded text-xs text-center border border-dashed mt-2">
                          برای مشاهده این بخش باید ثبت‌نام کنید
                        </div>
                      ) : (
                        <div className="bg-primary-50 text-primary-800 p-3 rounded border border-primary-100 mt-2 font-medium">
                          {event.location || event.joinLink || event.recordingUrl}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 mt-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-neutral-400" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">میزبان تجربه</div>
                    <div className="font-bold text-foreground">{event.host?.name}</div>
                  </div>
                </div>
              </div>

              {isRegistered ? (
                <div className="bg-success/10 text-success border border-success/20 p-4 rounded-xl text-center font-bold">
                  شما در این تجربه ثبت‌نام کرده‌اید!
                </div>
              ) : (
                <Button size="lg" className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/25" onClick={handleRegisterClick}>
                  ثبت‌نام و رزرو
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <OtpModal 
        isOpen={isOtpOpen} 
        onClose={() => setIsOtpOpen(false)} 
        onSuccess={handleOtpSuccess} 
      />
    </>
  );
}

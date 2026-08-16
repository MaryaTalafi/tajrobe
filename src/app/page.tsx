import Link from 'next/link';
import { ArrowLeft, Sparkles, Map, MousePointerClick, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EventCard } from '@/components/EventCard';
import { api } from '@/lib/data/mock';

export default async function HomePage() {
  const popularEvents = await api.getPopularEvents();

  return (
    <div className="flex flex-col w-full">
      {/* Section 1 — Hero */}
      <section className="relative overflow-hidden bg-primary-50 py-20 lg:py-32">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start gap-6 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>پلتفرم کشف تجربه‌های واقعی</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-primary-900 leading-[1.3]">
              لحظه‌هایی که زندگی <br /> را می‌سازند، <span className="text-primary">تجربه کن</span>
            </h1>
            <p className="text-lg text-neutral-600 max-w-lg leading-relaxed">
              از کارگاه‌های آنلاین تا دورهمی‌های حضوری. تجربه‌های معنادار را پیدا کن، با یک کلیک به آن‌ها بپیوند، یا خودت میزبان باش.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <Button size="lg" className="rounded-full px-8 text-base bg-primary hover:bg-primary-700" asChild>
                <Link href="/explore">کشف تجربه‌ها</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 text-base border-primary-200 hover:bg-primary-50 text-primary-700" asChild>
                <Link href="/host">میزبان شوید</Link>
              </Button>
            </div>
          </div>
          
          {/* Hero Animation / Visual */}
          <div className="relative h-[400px] w-full flex items-center justify-center z-10">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-200 to-accent-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>
            <div className="relative w-full max-w-md aspect-square bg-white rounded-[2rem] shadow-xl border border-primary-100 p-6 flex flex-col gap-4 transform rotate-3 hover:rotate-0 transition-transform duration-500">
               {/* Decorative mock UI inside the hero visual */}
               <div className="w-full h-48 bg-muted rounded-xl overflow-hidden relative">
                 <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070" className="object-cover w-full h-full" alt="Event visual" />
                 <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur rounded-lg p-3">
                   <div className="h-4 w-3/4 bg-primary-100 rounded mb-2"></div>
                   <div className="h-3 w-1/2 bg-neutral-100 rounded"></div>
                 </div>
               </div>
               <div className="flex gap-2">
                 <div className="h-10 w-10 rounded-full bg-accent-100"></div>
                 <div className="flex-1 space-y-2 py-1">
                   <div className="h-3 w-full bg-neutral-100 rounded"></div>
                   <div className="h-3 w-4/5 bg-neutral-100 rounded"></div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — The Problem */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">پیدا کردن رویداد خوب نباید سخت باشه</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            جستجو در سایت‌های شلوغ و بی‌نظم برای پیدا کردن یک رویداد ارزشمند، وقت‌گیر است. 
            شما لایق تجربه‌هایی هستید که روزمرگی را بشکنند، نه اینکه فقط یک بلیت دیگر بخرید.
          </p>
        </div>
      </section>

      {/* Section 3 — The Guide */}
      <section className="py-20 bg-[#20301C] text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6 text-[#F2F6F0]">ما اینجاییم تا مسیر را ساده کنیم</h2>
          <p className="text-lg text-[#C3D6BB] leading-relaxed mb-12">
            در تجربه، ما فضایی ساختیم که میزبانان پرشور و تجربه‌گرایان کنجکاو به هم برسند. 
            بدون پیچیدگی، فقط تجربه‌های خالص.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[#3A5631] pt-12">
            <div>
              <div className="text-4xl font-bold text-[#E3B15C] mb-2">+۱۰۰۰</div>
              <div className="text-[#C3D6BB]">تجربه برگزار شده</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#E3B15C] mb-2">+۵۰۰</div>
              <div className="text-[#C3D6BB]">میزبان فعال</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#E3B15C] mb-2">+۵۰هزار</div>
              <div className="text-[#C3D6BB]">تجربه‌گرا</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — The Plan */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">چطور کار می‌کند؟</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-primary-100 text-primary flex items-center justify-center mb-6">
                <Map className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">۱. یک تجربه پیدا کن</h3>
              <p className="text-muted-foreground">در بین دسته‌بندی‌ها بگرد و تجربه‌ای که با سلیقه‌ات جور درمی‌آید را انتخاب کن.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-primary-100 text-primary flex items-center justify-center mb-6">
                <MousePointerClick className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">۲. با یک کلیک عضو شو</h3>
              <p className="text-muted-foreground">بدون نیاز به ساخت اکانت پیچیده، فقط با یک ایمیل ثبت‌نامت را قطعی کن.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-primary-100 text-primary flex items-center justify-center mb-6">
                <PartyPopper className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">۳. تجربه‌ش کن</h3>
              <p className="text-muted-foreground">در زمان مقرر حاضر شو و از یک تجربه بی‌نظیر لذت ببر.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Direct Call to Action */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">آماده‌ای تا شروع کنی؟</h2>
          <Button size="lg" className="rounded-full px-12 text-lg bg-primary hover:bg-primary-700 h-14" asChild>
            <Link href="/explore">همین الان تجربه‌ها را ببین</Link>
          </Button>
        </div>
      </section>

      {/* Section 6 — Stakes */}
      <section className="py-20 bg-accent-100/50">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <p className="text-xl text-neutral-800 leading-relaxed font-medium">
            اجازه نده روزهایت شبیه هم باشند. تجربه‌های تازه، آدم‌های جدید و یادگیری مهارت‌های متفاوت منتظر توست.
          </p>
        </div>
      </section>

      {/* Section 7 — Success (Most Popular) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-foreground">پرطرفدارترین تجربه‌ها</h2>
            <Button variant="ghost" className="text-primary hover:bg-primary-50" asChild>
              <Link href="/explore" className="flex items-center gap-2">
                مشاهده همه
                <ArrowLeft className="w-4 h-4 shrink-0" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularEvents.slice(0, 4).map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 8 — Final CTA */}
      <section className="py-24 bg-[#20301C] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">تجربه‌ات را بساز</h2>
          <p className="text-lg text-[#C3D6BB] mb-10 max-w-2xl mx-auto">
            فرقی نمی‌کند می‌خواهی مهارت جدیدی یاد بگیری یا مهارتت را به دیگران آموزش دهی. اینجا جای توست.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 text-base bg-white text-[#20301C] hover:bg-neutral-100" asChild>
              <Link href="/explore">کشف تجربه‌ها</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 text-base border-[#3A5631] hover:bg-[#2C4126] text-white bg-transparent" asChild>
              <Link href="/host">میزبان شوید</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

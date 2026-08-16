import Link from 'next/link';
import { ArrowLeft, Sparkles, Map, MousePointerClick, PartyPopper } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
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
            <h1 className="text-4xl lg:text-6xl font-bold text-primary-900 leading-[1.3] animate-reveal-rtl">
              لحظه‌هایی که زندگی <br /> را می‌سازند، <span className="text-primary-600">تجربه کن</span>
            </h1>
            <p className="text-lg text-neutral-600 max-w-lg leading-relaxed">
              از کارگاه‌های آنلاین گرفته تا دورهمی‌های خودمونی حضوری. تجربه‌هایی که برات معنی دارن رو پیدا کن، با یه کلیک بهشون بپیوند یا خودت میزبان یکی از اونا باش.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <Link href="/explore" className={buttonVariants({ size: "lg", className: "rounded-full px-8 text-base" })}>
                کشف تجربه‌ها
              </Link>
              <Link href="/host" className={buttonVariants({ size: "lg", variant: "outline", className: "rounded-full px-8 text-base" })}>
                میزبان شوید
              </Link>
            </div>
          </div>
          
          {/* Hero Animation / Visual */}
          <div className="relative h-[400px] w-full flex items-center justify-center z-10">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-200 to-accent-100 rounded-[3rem] blur-3xl opacity-60 animate-pulse"></div>
            <div className="relative w-full max-w-md aspect-square bg-white rounded-full shadow-2xl p-2 flex flex-col gap-4 animate-float overflow-hidden border-4 border-white/50">
               <Image 
                  src="/hero-collage.jpg" 
                  alt="Tajrobe Collage" 
                  fill
                  className="object-cover rounded-full"
                  priority
               />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — The Problem */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">پیدا کردن رویداد خوب نباید سخت باشه</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            گشتن تو سایت‌های شلوغ و بی‌نظم برای پیدا کردن یه رویداد ارزشمند، خیلی وقت‌گیره. 
            شما لایق تجربه‌هایی هستین که روزمرگی رو بشکنن، نه اینکه فقط یه بلیت دیگه بخرین.
          </p>
        </div>
      </section>

      {/* Section 3 — The Guide */}
      <section className="py-20 bg-[#20301C] text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6 text-[#F2F6F0]">ما اینجاییم تا مسیر رو برات ساده کنیم</h2>
          <p className="text-lg text-[#C3D6BB] leading-relaxed mb-12">
            توی تجربه، فضایی ساختیم تا میزبان‌های پرشور و آدم‌های کنجکاو بتونن راحت همدیگه رو پیدا کنن. بدون دردسر، فقط خودِ تجربه.
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
            <h2 className="text-3xl font-bold text-foreground mb-4">چطور کار می‌کنه؟</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-primary-100 text-primary flex items-center justify-center mb-6">
                <Map className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">۱. یه تجربه پیدا کن</h3>
              <p className="text-muted-foreground">توی دسته‌بندی‌ها بگرد و تجربه‌ای که با سلیقه‌ت جوره رو انتخاب کن.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-primary-100 text-primary flex items-center justify-center mb-6">
                <MousePointerClick className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">۲. با یه کلیک عضو شو</h3>
              <p className="text-muted-foreground">بدون دردسرهای ساخت اکانت، فقط با یه ایمیل ثبت‌نامت رو قطعی کن.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-primary-100 text-primary flex items-center justify-center mb-6">
                <PartyPopper className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">۳. تجربه‌ش کن</h3>
              <p className="text-muted-foreground">تو زمان مقرر حاضر شو و از یه تجربه بی‌نظیر حسابی لذت ببر.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Direct Call to Action */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">آماده‌ای تا شروع کنی؟</h2>
          <Link href="/explore" className={buttonVariants({ size: "lg", className: "rounded-full px-12 text-lg h-14" })}>
            همین الان تجربه‌ها را ببین
          </Link>
        </div>
      </section>

      {/* Section 6 — Stakes */}
      <section className="py-20 bg-accent-100/50">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <p className="text-xl text-neutral-800 leading-relaxed font-medium">
            نذار روزهات شبیه هم باشن. تجربه‌های تازه، آدم‌های جدید و یادگیری مهارت‌های متفاوت منتظرته.
          </p>
        </div>
      </section>

      {/* Section 7 — Success (Most Popular) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-foreground">پرطرفدارترین تجربه‌ها</h2>
            <Link href="/explore" className={buttonVariants({ variant: "ghost", className: "text-primary hover:bg-primary-50 flex items-center gap-2" })}>
              مشاهده همه
              <ArrowLeft className="w-4 h-4 shrink-0" />
            </Link>
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
          <h2 className="text-4xl font-bold mb-6">تجربه‌ت رو بساز</h2>
          <p className="text-lg text-[#C3D6BB] mb-10 max-w-2xl mx-auto">
            فرقی نمی‌کنه بخوای یه مهارت جدید یاد بگیری یا تخصصت رو به بقیه آموزش بدی. اینجا جای توئه.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/explore" className={buttonVariants({ size: "lg", className: "rounded-full px-8 text-base bg-white text-[#20301C] hover:bg-neutral-100" })}>
              کشف تجربه‌ها
            </Link>
            <Link href="/host" className={buttonVariants({ size: "lg", variant: "outline", className: "rounded-full px-8 text-base border-[#3A5631] hover:bg-[#2C4126] text-white bg-transparent" })}>
              میزبان شوید
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

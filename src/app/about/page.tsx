import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export const metadata = {
  title: 'درباره تجربه | Tajrobe',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl leading-relaxed">
      <h1 className="text-4xl font-bold mb-8 text-primary-900">تجربه، برای لحظه‌هایی که واقعاً زندگی می‌کنن</h1>
      <p className="text-lg mb-10 text-muted-foreground">
        تجربه یک پلتفرمه برای پیدا کردن، ثبت‌نام و برگزاری چیزهایی که ارزش وقت گذاشتن دارن؛ یک کارگاه آموزشی، یک کنسرت، یک دورهمی کوچیک، یا هر چیزی که بعد از تمومش، حس کنی یه چیزی از زندگیت اضافه شده.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4 text-foreground">داستان ما</h2>
      <p className="text-lg mb-6 text-muted-foreground">
        همه‌مون این تجربه رو داشتیم: دنبال یه رویداد خوب گشتیم و به یه سایت شلوغ و بی‌نظم رسیدیم که پیدا کردن چیز درست توش سخت بود. تجربه از همین‌جا شروع شد؛ از این ایده که پیدا کردن یک تجربه‌ی خوب نباید سخت باشه، و هر آدمی لایق یک لحظه‌ی به‌یادموندنیه، نه فقط یک بلیط دیگه.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4 text-foreground">چطور کار می‌کنیم</h2>
      <div className="space-y-4 mb-6">
        <p className="text-lg text-muted-foreground">
          <strong className="text-foreground">کشف آسون.</strong> دنبال چیزی می‌گردی که واقعاً به کارت بیاد؟ فیلترها و دسته‌بندی‌ها کمکت می‌کنن سریع برسی بهش.
        </p>
        <p className="text-lg text-muted-foreground">
          <strong className="text-foreground">ثبت‌نام بدون دردسر.</strong> بدون ساخت اکانت پیچیده، فقط با یک ایمیل و یک کد، جات رو توی تجربه‌ای که دوست داری رزرو کن.
        </p>
        <p className="text-lg text-muted-foreground">
          <strong className="text-foreground">تجربه‌ی واقعی.</strong> ما فقط بلیط نمی‌فروشیم؛ می‌خوایم بعد از هر تجربه، یه چیزی برات مونده باشه.
        </p>
      </div>

      <h2 className="text-2xl font-semibold mt-12 mb-4 text-foreground">برای چه کسانیه</h2>
      <p className="text-lg mb-4 text-muted-foreground">
        اگه دنبال چیزی برای انجام دادنی — یک تجربه‌گرایی، و تجربه دقیقاً برای توئه.
      </p>
      <p className="text-lg mb-10 text-muted-foreground">
        اگه چیزی داری که می‌خوای با بقیه به اشتراک بذاری — یک کارگاه، یک رویداد، یک دورهمی — می‌تونی میزبان تجربه بشی و در چند دقیقه اون رو منتشر کنی.
      </p>

      <div className="bg-primary-50 rounded-2xl p-8 text-center mt-12">
        <h2 className="text-2xl font-bold mb-6 text-primary-900">آماده‌ای؟</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/explore" className={buttonVariants({ size: "lg", className: "rounded-full px-8" })}>
            کشف تجربه‌ها
          </Link>
          <Link href="/host" className={buttonVariants({ size: "lg", variant: "outline", className: "rounded-full px-8" })}>
            میزبان شوید
          </Link>
        </div>
      </div>
    </div>
  );
}

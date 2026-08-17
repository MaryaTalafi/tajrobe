import { ChevronDown } from 'lucide-react';

export const metadata = {
  title: 'پشتیبانی | Tajrobe',
};

function FaqItem({ question, answer }: { question: string, answer: React.ReactNode }) {
  return (
    <details className="group border-b border-border py-4 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-medium text-foreground">
        <h3 className="text-lg">{question}</h3>
        <ChevronDown className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180 text-muted-foreground" />
      </summary>
      <div className="mt-4 leading-relaxed text-muted-foreground">
        {answer}
      </div>
    </details>
  );
}

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl leading-relaxed">
      <h1 className="text-4xl font-bold mb-4 text-primary-900">هر سوالی داری، ما اینجاییم</h1>
      <p className="text-lg mb-12 text-muted-foreground">
        اگه چیزی گیر کردی یا سوالی داری، خوشحال می‌شیم کمکت کنیم.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4 text-foreground">راه‌های ارتباطی</h2>
      <p className="text-lg mb-12 text-muted-foreground">
        می‌تونی از طریق ایمیل <a href="mailto:support@tajrobe.ir" className="text-primary hover:underline font-medium">support@tajrobe.ir</a> با ما در تماس باشی. سعی می‌کنیم تا زودترین زمان ممکن جوابت رو بدیم.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-6 text-foreground">سوالات پرتکرار</h2>
      
      <div className="space-y-2 mb-12">
        <FaqItem 
          question="چطور یک تجربه بسازم؟" 
          answer={
            <>
              از دکمه‌ی «میزبان شوید» توی هدر سایت شروع کن. باید یک بار با ایمیلت وارد بشی،
              بعدش فرم ساخت تجربه رو پر می‌کنی: عنوان، دسته‌بندی، تصویر، زمان و مکان، و
              توضیحات. می‌تونی به‌صورت پیش‌نویس ذخیره‌ش کنی یا مستقیم منتشرش کنی.
            </>
          } 
        />
        <FaqItem 
          question="چطور توی یک تجربه ثبت‌نام کنم؟" 
          answer={
            <>
              وارد صفحه‌ی تجربه‌ی موردنظر شو و روی دکمه‌ی «ثبت‌نام» بزن. اگه قبلاً وارد نشده
              باشی، ازت یک کد یک‌بارمصرف می‌خوایم که به ایمیلت می‌فرستیم. بعد از تایید کد،
              ثبت‌نامت انجام می‌شه.
            </>
          } 
        />
        <FaqItem 
          question="اگه نتونم توی تجربه‌ای که ثبت‌نام کردم شرکت کنم چی؟" 
          answer={
            <>
              فعلاً امکان لغو خودکار ثبت‌نام وجود نداره؛ برای این موارد کافیه از طریق ایمیل
              پشتیبانی به ما اطلاع بدی.
            </>
          } 
        />
        <FaqItem 
          question="کد OTP رو دریافت نمی‌کنم، چیکار کنم؟" 
          answer={
            <>
              اول پوشه‌ی اسپم یا تبلیغات ایمیلت رو چک کن. اگه بازم پیدا نشد، چند دقیقه صبر کن
              و دوباره درخواست کد بده. اگه مشکل ادامه داشت، با پشتیبانی تماس بگیر.
            </>
          } 
        />
        <FaqItem 
          question="چطور به‌عنوان میزبان لیست شرکت‌کننده‌ها رو ببینم؟" 
          answer={
            <>
              از داشبورد میزبانی، وارد تجربه‌ی موردنظرت شو؛ لیست کامل تجربه‌گراهایی که
              ثبت‌نام کردن اونجا در دسترسته.
            </>
          } 
        />
      </div>

      <div className="bg-neutral-50 rounded-2xl p-8 border mt-12">
        <h2 className="text-xl font-bold mb-3 text-foreground">هنوز سوالی داری؟</h2>
        <p className="text-muted-foreground">
          اگه جواب سوالت رو اینجا پیدا نکردی، از طریق ایمیل <a href="mailto:support@tajrobe.ir" className="text-primary hover:underline font-medium">support@tajrobe.ir</a> بهمون بگو.
        </p>
      </div>
    </div>
  );
}

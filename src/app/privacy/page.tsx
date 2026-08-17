export const metadata = {
  title: 'حریم خصوصی | Tajrobe',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl leading-relaxed">
      <h1 className="text-4xl font-bold mb-6 text-foreground">حریم خصوصی</h1>
      <p className="text-lg mb-10 text-muted-foreground">
        حریم خصوصی شما برای ما مهم است. این صفحه توضیح می‌دهد چه اطلاعاتی جمع‌آوری می‌کنیم، چطور از آن‌ها استفاده می‌کنیم و چه حقوقی نسبت به آن‌ها دارید.
      </p>

      <div className="space-y-8 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">۱. چه اطلاعاتی جمع‌آوری می‌کنیم</h2>
          <p>
            هنگام استفاده از تجربه، اطلاعات زیر جمع‌آوری می‌شود: آدرس ایمیل شما (برای ورود با کد یک‌بارمصرف)، و فعالیت‌های شما در پلتفرم شامل ثبت‌نام در تجربه‌ها، افزودن به علاقه‌مندی‌ها، و امتیاز/نظری که ثبت می‌کنید.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">۲. چطور از این اطلاعات استفاده می‌کنیم</h2>
          <p>
            از ایمیل شما برای احراز هویت (ارسال کد ورود)، ارسال ایمیل تاییدیه‌ی ثبت‌نام، و ارسال یادآوری یک ساعت پیش از شروع تجربه استفاده می‌کنیم. اطلاعات ثبت‌نام شما در اختیار میزبان همان تجربه قرار می‌گیرد تا بتواند لیست شرکت‌کنندگان را مدیریت کند.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">۳. اشتراک‌گذاری با اشخاص ثالث</h2>
          <p>
            اطلاعات شما را به هیچ شخص ثالثی برای مقاصد تبلیغاتی نمی‌فروشیم. برای ارائه‌ی خدمات پلتفرم از سرویس‌دهنده‌های ایمیل (برای ارسال ایمیل‌های تاییدیه/یادآوری) و سرویس ذخیره‌سازی فایل (برای نگهداری تصاویر رویدادها) استفاده می‌کنیم؛ این سرویس‌دهنده‌ها فقط در حد لازم برای انجام همین وظایف به اطلاعات دسترسی دارند.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">۴. نشست‌ها و کوکی‌ها</h2>
          <p>
            برای نگه‌داشتن شما وارد حساب کاربری‌تان، از یک کوکی نشست استفاده می‌کنیم. اگر گزینه‌ی «مرا به خاطر بسپار» را هنگام ورود انتخاب نکنید، این نشست با بستن مرورگر پایان می‌یابد و در مراجعه‌ی بعدی باید دوباره وارد شوید.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">۵. حقوق شما</h2>
          <p>
            می‌توانید در هر زمان درخواست حذف حساب کاربری خود یا دریافت نسخه‌ای از اطلاعاتی که از شما نگهداری می‌شود را از طریق ایمیل پشتیبانی ارسال کنید.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">۶. مدت نگهداری اطلاعات</h2>
          <p>
            اطلاعات حساب و فعالیت شما تا زمانی که حساب کاربری‌تان فعال است نگهداری می‌شود؛ در صورت درخواست حذف حساب، اطلاعات شخصی شما مطابق درخواست حذف خواهد شد.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">۷. تغییرات این سیاست</h2>
          <p>
            این سیاست حریم خصوصی ممکن است به‌مرور به‌روزرسانی شود. تغییرات مهم از طریق پلتفرم یا ایمیل به اطلاع کاربران خواهد رسید.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">۸. تماس</h2>
          <p>
            برای سوالات مربوط به حریم خصوصی، از طریق ایمیل <a href="mailto:support@tajrobe.ir" className="text-primary hover:underline font-medium">support@tajrobe.ir</a> با ما در تماس باشید.
          </p>
        </section>
      </div>
    </div>
  );
}

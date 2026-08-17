export const metadata = {
  title: 'قوانین و مقررات | Tajrobe',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl leading-relaxed">
      <h1 className="text-4xl font-bold mb-6 text-foreground">قوانین و مقررات</h1>
      <p className="text-lg mb-10 text-muted-foreground">
        با استفاده از تجربه، شما این قوانین و مقررات را می‌پذیرید. لطفاً پیش از استفاده از پلتفرم، این صفحه را با دقت مطالعه کنید.
      </p>

      <div className="space-y-8 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">۱. تعریف نقش‌ها</h2>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li><strong className="text-foreground">میزبان تجربه:</strong> کاربری که یک تجربه (رویداد) در پلتفرم ایجاد و منتشر می‌کند.</li>
            <li><strong className="text-foreground">تجربه‌گرا:</strong> کاربری که در تجربه‌های منتشرشده ثبت‌نام یا شرکت می‌کند.</li>
            <li><strong className="text-foreground">ادمین:</strong> مدیر پلتفرم که بر رویدادها، کاربران و دسته‌بندی‌ها نظارت دارد.</li>
          </ul>
          <p>
            هر کاربر می‌تواند هم‌زمان هم میزبان تجربه‌های خودش باشد و هم به‌عنوان تجربه‌گرا در تجربه‌های دیگران ثبت‌نام کند.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">۲. مسئولیت‌های میزبان تجربه</h2>
          <p>
            میزبان مسئول صحت اطلاعاتی است که هنگام ایجاد تجربه وارد می‌کند، از جمله عنوان، زمان، مکان، هزینه و توضیحات. میزبان موظف است اطلاعات تماس یا دسترسی (مانند لینک شرکت آنلاین یا آدرس محل برگزاری) را فقط برای تجربه‌گراهای ثبت‌نام‌شده در دسترس قرار دهد و در صورت هرگونه تغییر در زمان یا شرایط برگزاری، تجربه‌گراها را مطلع کند.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">۳. مسئولیت‌های تجربه‌گرا</h2>
          <p>
            تجربه‌گرا موظف است در تجربه‌هایی که ثبت‌نام می‌کند، با احترام و طبق قوانین همان رویداد رفتار کند. رفتار محترمانه در بخش نظرات و امتیازدهی الزامی است؛ ارسال محتوای توهین‌آمیز، نامرتبط یا نادرست مجاز نیست.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">۴. سیاست ثبت‌نام و لغو</h2>
          <p>
            در این نسخه از پلتفرم، درگاه پرداخت پیاده‌سازی نشده است. بنابراین ثبت‌نام در تجربه‌ها — چه رایگان و چه دارای هزینه‌ی نمایشی — در حال حاضر هیچ تعهد مالی نهایی برای کاربر ایجاد نمی‌کند. جزئیات پرداخت و سیاست بازگشت وجه، با فعال‌سازی درگاه پرداخت در نسخه‌های بعدی اعلام خواهد شد.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">۵. محتوای غیرمجاز و گزارش تخلف</h2>
          <p>
            انتشار محتوای غیرقانونی، توهین‌آمیز، گمراه‌کننده یا ناقض حقوق دیگران در تجربه‌ها، توضیحات یا نظرات مجاز نیست. تجربه‌گراها می‌توانند موارد نقض این قوانین را از طریق پشتیبانی گزارش دهند؛ تجربه یا نظر گزارش‌شده پس از بررسی ممکن است توسط ادمین حذف شود.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">۶. محدودیت مسئولیت پلتفرم</h2>
          <p>
            تجربه صرفاً نقش واسط میان میزبان‌ها و تجربه‌گراها را ایفا می‌کند. مسئولیت کیفیت، صحت اجرا و برگزاری هر تجربه بر عهده‌ی میزبان همان تجربه است. پلتفرم مسئولیتی در قبال خسارات ناشی از عدم برگزاری یا برگزاری نادرست یک تجربه توسط میزبان نمی‌پذیرد.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">۷. تغییرات در قوانین</h2>
          <p>
            این قوانین ممکن است در آینده به‌روزرسانی شوند. در صورت تغییرات مهم، تلاش می‌کنیم از طریق پلتفرم یا ایمیل به کاربران اطلاع‌رسانی کنیم.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-foreground">۸. تماس</h2>
          <p>
            برای هرگونه سوال درباره‌ی این قوانین، از طریق ایمیل <a href="mailto:support@tajrobe.ir" className="text-primary hover:underline font-medium">support@tajrobe.ir</a> با ما در تماس باشید.
          </p>
        </section>
      </div>
    </div>
  );
}

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-neutral-50 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="font-bold text-2xl text-primary">
              تجربه
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              تجربه، پلتفرمی برای کشف و شرکت در رویدادهای بی‌نظیر. از آنلاین تا حضوری، همیشه تجربه‌ای برای شما هست.
            </p>
          </div>
          
          {/* Explore */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground mb-2">کشف کنید</h3>
            <Link href="/explore" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              همه تجربه‌ها
            </Link>
            <Link href="/explore?category=آموزشی-و-کارگاه" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              آموزشی و کارگاه
            </Link>
            <Link href="/explore?category=موسیقی-و-کنسرت" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              موسیقی و کنسرت
            </Link>
          </div>

          {/* Host */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground mb-2">میزبان شوید</h3>
            <Link href="/host" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              ایجاد تجربه جدید
            </Link>
            <Link href="/guidelines" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              راهنمای میزبانان
            </Link>
          </div>

          {/* Company & Legal */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground mb-2">درباره ما</h3>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              درباره تجربه
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              پشتیبانی
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors mt-2">
              قوانین و مقررات
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              حریم خصوصی
            </Link>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} تجربه — تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}

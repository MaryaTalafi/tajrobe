import { Search, Filter } from 'lucide-react';
import { api } from '@/lib/data/mock';
import { EventCard } from '@/components/EventCard';
import { Button } from '@/components/ui/button';
import { JalaliDatePicker } from '@/components/JalaliDatePicker';
import { toPersianDigits } from '@/lib/utils';

export default async function ExplorePage() {
  const events = await api.getEvents();
  const categories = await api.getCategories();

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 shrink-0 flex flex-col gap-8">
        <div className="flex items-center gap-2 font-bold text-lg border-b pb-4">
          <Filter className="w-5 h-5 text-primary" />
          <span>فیلترها</span>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">دسته‌بندی</h3>
          <div className="flex flex-col gap-2">
            {categories.map(category => (
              <label key={category.id} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                <input type="checkbox" className="rounded border-input text-primary focus:ring-primary h-4 w-4" />
                <span>{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-foreground">نوع برگزاری</h3>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
              <input type="checkbox" className="rounded border-input text-primary focus:ring-primary h-4 w-4" />
              <span>حضوری</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
              <input type="checkbox" className="rounded border-input text-primary focus:ring-primary h-4 w-4" />
              <span>آنلاین</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
              <input type="checkbox" className="rounded border-input text-primary focus:ring-primary h-4 w-4" />
              <span>آفلاین (ضبط شده)</span>
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-foreground">هزینه</h3>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
              <input type="radio" name="price" className="border-input text-primary focus:ring-primary h-4 w-4" defaultChecked />
              <span>همه</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
              <input type="radio" name="price" className="border-input text-primary focus:ring-primary h-4 w-4" />
              <span>رایگان</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
              <input type="radio" name="price" className="border-input text-primary focus:ring-primary h-4 w-4" />
              <span>پولی</span>
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-foreground">تاریخ برگزاری</h3>
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">از تاریخ</label>
              <JalaliDatePicker placeholder="انتخاب تاریخ" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">تا تاریخ</label>
              <JalaliDatePicker placeholder="انتخاب تاریخ" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="جستجوی نام تجربه، میزبان یا کلمات کلیدی..." 
              className="w-full h-12 rounded-lg border border-input bg-background px-11 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <Button size="lg" className="w-full sm:w-auto h-12 px-8">
            جستجو
          </Button>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2 mt-4">
          <span>{toPersianDigits(events.length)} تجربه پیدا شد</span>
          <select className="border-none bg-transparent outline-none focus:ring-0 text-foreground font-medium cursor-pointer">
            <option>مرتب‌سازی: جدیدترین</option>
            <option>مرتب‌سازی: محبوب‌ترین</option>
            <option>مرتب‌سازی: ارزان‌ترین</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        
        {events.length === 0 && (
          <div className="text-center py-24 flex flex-col items-center border rounded-xl bg-neutral-50/50 border-dashed">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">تجربه‌ای با این مشخصات هنوز ثبت نشده</h3>
            <p className="text-muted-foreground">فیلترها را تغییر دهید یا کلمه دیگری را جستجو کنید.</p>
          </div>
        )}
      </div>
    </div>
  );
}

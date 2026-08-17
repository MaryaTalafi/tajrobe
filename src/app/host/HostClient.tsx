"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { OtpModal } from '@/components/OtpModal';
import { JalaliDatePicker } from '@/components/JalaliDatePicker';

export function HostClient() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);

  useEffect(() => {
    // Pop OTP modal on mount if not authenticated
    if (!isAuthenticated) {
      setIsOtpOpen(true);
    }
  }, [isAuthenticated]);

  const [mode, setMode] = useState('IN_PERSON');
  const [hasTime, setHasTime] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">برای میزبانی تجربه باید وارد حساب کاربری شوید</h1>
        <Button onClick={() => setIsOtpOpen(true)} size="lg">ورود / ثبت‌نام</Button>
        <OtpModal 
          isOpen={isOtpOpen} 
          onClose={() => setIsOtpOpen(false)} 
          onSuccess={() => setIsAuthenticated(true)} 
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-foreground mb-8">ایجاد تجربه جدید</h1>
      
      <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert("تجربه با موفقیت ایجاد شد!"); }}>
        <div className="space-y-6 bg-white p-6 rounded-2xl border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">چی می‌خوای برگزار کنی؟</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">عنوان تجربه <span className="text-destructive">*</span></label>
            <input required type="text" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" placeholder="مثلا: کارگاه سفالگری پیشرفته" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">دسته‌بندی <span className="text-destructive">*</span></label>
            <select required className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none bg-background">
              <option value="">انتخاب کنید...</option>
              <option value="c1">آموزشی و کارگاه</option>
              <option value="c2">موسیقی و کنسرت</option>
              <option value="c3">هنر و فرهنگ</option>
              <option value="c12">سایر</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">تصویر کاور <span className="text-destructive">*</span></label>
            <div className="border-2 border-dashed rounded-xl p-8 text-center bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer">
              <p className="text-muted-foreground text-sm mb-2">برای آپلود کلیک کنید، یا عکس را همین‌جا رها کنید</p>
              <Button type="button" variant="outline" size="sm">انتخاب فایل</Button>
            </div>
          </div>
        </div>

        <div className="space-y-6 bg-white p-6 rounded-2xl border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">کِی و کجا برگزار می‌شه؟</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">تاریخ شروع <span className="text-destructive">*</span></label>
              <JalaliDatePicker placeholder="انتخاب تاریخ" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">تاریخ پایان <span className="text-destructive">*</span></label>
              <JalaliDatePicker placeholder="انتخاب تاریخ" />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input type="checkbox" id="hasTime" className="rounded border-input text-primary focus:ring-primary h-4 w-4" checked={hasTime} onChange={(e) => setHasTime(e.target.checked)} />
            <label htmlFor="hasTime" className="text-sm font-medium cursor-pointer">تنظیم ساعت دقیق برگزاری</label>
          </div>

          {hasTime && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
              <div>
                <label className="block text-sm font-medium mb-2">ساعت شروع</label>
                <input type="time" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none bg-background" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ساعت پایان</label>
                <input type="time" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none bg-background" />
              </div>
            </div>
          )}
          
          <hr className="border-border" />

          <div>
            <label className="block text-sm font-medium mb-2">نوع برگزاری <span className="text-destructive">*</span></label>
            <div className="flex gap-6 mt-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="mode" value="IN_PERSON" checked={mode === 'IN_PERSON'} onChange={() => setMode('IN_PERSON')} className="text-primary focus:ring-primary h-4 w-4" />
                <span className="text-sm">حضوری</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="mode" value="ONLINE" checked={mode === 'ONLINE'} onChange={() => setMode('ONLINE')} className="text-primary focus:ring-primary h-4 w-4" />
                <span className="text-sm">آنلاین</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="mode" value="OFFLINE_RECORDED" checked={mode === 'OFFLINE_RECORDED'} onChange={() => setMode('OFFLINE_RECORDED')} className="text-primary focus:ring-primary h-4 w-4" />
                <span className="text-sm">آفلاین (ضبط شده)</span>
              </label>
            </div>
          </div>

          {mode === 'IN_PERSON' && (
            <div className="animate-in fade-in duration-300">
              <label className="block text-sm font-medium mb-2">آدرس دقیق محل برگزاری <span className="text-destructive">*</span></label>
              <textarea required className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none min-h-[80px]" placeholder="تهران،..."></textarea>
            </div>
          )}

          {mode === 'ONLINE' && (
            <div className="animate-in fade-in duration-300">
              <label className="block text-sm font-medium mb-2">لینک ورود به رویداد آنلاین <span className="text-destructive">*</span></label>
              <input required type="url" dir="ltr" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none text-left" placeholder="https://meet.google.com/..." />
            </div>
          )}

          {mode === 'OFFLINE_RECORDED' && (
            <div className="animate-in fade-in duration-300">
              <label className="block text-sm font-medium mb-2">لینک دسترسی به محتوای ضبط شده <span className="text-destructive">*</span></label>
              <input required type="url" dir="ltr" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none text-left" placeholder="https://..." />
            </div>
          )}
        </div>

        <div className="space-y-6 bg-white p-6 rounded-2xl border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">جزئیات و هزینه</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">هزینه ثبت‌نام (تومان)</label>
            <input type="number" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" placeholder="خالی بگذارید تا رایگان شود" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">توضیحات تجربه <span className="text-destructive">*</span></label>
            <textarea required className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none min-h-[200px]" placeholder="در این تجربه چه اتفاقی می‌افتد؟ هرچی بیشتر بگی، تجربه‌گراها بهتر تصمیم می‌گیرن."></textarea>
          </div>
        </div>
        
        <div className="flex gap-4 pt-4 sticky bottom-6 bg-background/90 backdrop-blur p-4 rounded-xl border shadow-sm z-10">
          <Button type="submit" size="lg" className="flex-1 text-lg h-12 shadow-md">ذخیره و انتشار</Button>
          <Button type="button" variant="outline" size="lg" className="h-12 shadow-sm">ذخیره پیش‌نویس</Button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useState } from 'react';
import { User, Event, Category } from '@/types';
import { Search, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AdminClient({ users, events, categories }: { users: User[], events: Event[], categories: Category[] }) {
  const [activeTab, setActiveTab] = useState<'events' | 'users' | 'categories'>('events');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">پنل مدیریت</h1>
      </div>

      <div className="flex gap-4 border-b mb-8 overflow-x-auto whitespace-nowrap">
        <button 
          className={`pb-4 px-2 font-medium text-lg border-b-2 transition-colors ${activeTab === 'events' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          onClick={() => setActiveTab('events')}
        >
          رویدادها
        </button>
        <button 
          className={`pb-4 px-2 font-medium text-lg border-b-2 transition-colors ${activeTab === 'users' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          onClick={() => setActiveTab('users')}
        >
          کاربران
        </button>
        <button 
          className={`pb-4 px-2 font-medium text-lg border-b-2 transition-colors ${activeTab === 'categories' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          onClick={() => setActiveTab('categories')}
        >
          دسته‌بندی‌ها
        </button>
      </div>

      {activeTab === 'events' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            <h2 className="text-xl font-bold">مدیریت رویدادها</h2>
            <div className="relative w-full sm:w-64">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="جستجو..." className="w-full h-10 pl-4 pr-10 rounded-md border text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>
          </div>
          <div className="bg-white border rounded-xl overflow-x-auto">
            <table className="w-full text-sm text-right min-w-[600px]">
              <thead className="bg-neutral-50 text-neutral-500 border-b">
                <tr>
                  <th className="px-6 py-4 font-medium">عنوان تجربه</th>
                  <th className="px-6 py-4 font-medium">میزبان</th>
                  <th className="px-6 py-4 font-medium">تاریخ</th>
                  <th className="px-6 py-4 font-medium">وضعیت</th>
                  <th className="px-6 py-4 font-medium">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {events.map(event => (
                  <tr key={event.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 font-medium text-foreground">{event.title}</td>
                    <td className="px-6 py-4 text-muted-foreground">{event.host?.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Intl.DateTimeFormat('fa-IR').format(new Date(event.startDate))}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${event.status === 'PUBLISHED' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                        {event.status === 'PUBLISHED' ? 'منتشر شده' : 'پیش‌نویس'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-primary" title="تایید"><CheckCircle className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive" title="رد"><XCircle className="w-4 h-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            <h2 className="text-xl font-bold">مدیریت کاربران</h2>
            <div className="relative w-full sm:w-64">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="جستجو..." className="w-full h-10 pl-4 pr-10 rounded-md border text-sm focus:ring-2 focus:ring-primary focus:outline-none" />
            </div>
          </div>
          <div className="bg-white border rounded-xl overflow-x-auto">
            <table className="w-full text-sm text-right min-w-[600px]">
              <thead className="bg-neutral-50 text-neutral-500 border-b">
                <tr>
                  <th className="px-6 py-4 font-medium">نام</th>
                  <th className="px-6 py-4 font-medium">ایمیل</th>
                  <th className="px-6 py-4 font-medium">نقش</th>
                  <th className="px-6 py-4 font-medium">تاریخ عضویت</th>
                  <th className="px-6 py-4 font-medium">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 font-medium text-foreground">{user.name || 'بدون نام'}</td>
                    <td className="px-6 py-4 text-muted-foreground text-left" dir="ltr">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'ADMIN' ? 'bg-primary-100 text-primary-700' : 'bg-neutral-100 text-neutral-600'}`}>
                        {user.role === 'ADMIN' ? 'ادمین' : 'کاربر عادی'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Intl.DateTimeFormat('fa-IR').format(new Date(user.createdAt))}
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive"><Trash2 className="w-4 h-4" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'categories' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            <h2 className="text-xl font-bold">دسته‌بندی‌ها</h2>
            <Button>افزودن دسته‌بندی</Button>
          </div>
          <div className="bg-white border rounded-xl overflow-x-auto">
            <table className="w-full text-sm text-right min-w-[600px]">
              <thead className="bg-neutral-50 text-neutral-500 border-b">
                <tr>
                  <th className="px-6 py-4 font-medium">نام دسته‌بندی</th>
                  <th className="px-6 py-4 font-medium">اسلاگ (Slug)</th>
                  <th className="px-6 py-4 font-medium">وضعیت</th>
                  <th className="px-6 py-4 font-medium">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {categories.map(category => (
                  <tr key={category.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 font-medium text-foreground">{category.name}</td>
                    <td className="px-6 py-4 text-muted-foreground text-left" dir="ltr">{category.slug}</td>
                    <td className="px-6 py-4">
                      {category.isFallback ? (
                        <span className="bg-warning/10 text-warning px-2 py-1 rounded text-xs font-bold">سیستمی (سایر)</span>
                      ) : (
                        <span className="bg-success/10 text-success px-2 py-1 rounded text-xs font-bold">فعال</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground"><Edit className="w-4 h-4" /></Button>
                        {!category.isFallback && (
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive" title="حذف و انتقال تجربیات به دسته 'سایر'"><Trash2 className="w-4 h-4" /></Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            توجه: با حذف یک دسته‌بندی، تمامی رویدادهای مرتبط با آن به دسته‌بندی «سایر» منتقل خواهند شد. دسته‌بندی «سایر» قابل حذف نیست.
          </p>
        </div>
      )}
    </div>
  );
}

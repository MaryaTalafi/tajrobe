"use client";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export function JalaliDatePicker({ placeholder }: { placeholder: string }) {
  return (
    <DatePicker
      calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-right"
      containerClassName="w-full"
      inputClass="w-full text-sm border border-input rounded-md px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
      placeholder={placeholder}
    />
  );
}

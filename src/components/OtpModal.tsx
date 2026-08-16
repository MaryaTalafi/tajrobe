"use client";

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';

export function OtpModal({ isOpen, onClose, onSuccess }: { isOpen: boolean, onClose: () => void, onSuccess: () => void }) {
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-background rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-lg">ورود / ثبت‌نام</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="p-6 flex flex-col gap-6">
          {step === 'email' ? (
            <>
              <div className="text-center">
                <p className="text-muted-foreground mb-6">برای ادامه، لطفا ایمیل خود را وارد کنید.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <input 
                    type="email" 
                    placeholder="ایمیل شما" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    dir="ltr"
                    className="w-full h-12 rounded-lg border border-input bg-background px-4 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>
                <Button 
                  className="w-full h-12 text-base" 
                  onClick={() => setStep('code')}
                  disabled={!email}
                >
                  ارسال کد تایید
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <p className="text-muted-foreground mb-2">کد تایید به {email} ارسال شد.</p>
                <button onClick={() => setStep('email')} className="text-sm text-primary hover:underline">
                  ویرایش ایمیل
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <input 
                    type="text" 
                    placeholder="کد ۶ رقمی" 
                    dir="ltr"
                    className="w-full h-12 rounded-lg border border-input bg-background px-4 py-2 text-center tracking-widest text-lg font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    maxLength={6}
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input type="checkbox" className="rounded border-input text-primary focus:ring-primary h-4 w-4" />
                  <span>مرا به خاطر بسپار</span>
                </label>
                <Button 
                  className="w-full h-12 text-base" 
                  onClick={() => {
                    onSuccess();
                    onClose();
                  }}
                >
                  تایید و ورود
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

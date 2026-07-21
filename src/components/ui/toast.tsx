'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { X, Check, AlertCircle, Info, Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Toast, ToastType } from '@/types';

class ToastObserver {
  subscribers: Array<(toasts: Toast[]) => void> = [];
  toasts: Toast[] = [];

  subscribe = (subscriber: (toasts: Toast[]) => void) => {
    this.subscribers.push(subscriber);
    return () => {
      const index = this.subscribers.indexOf(subscriber);
      this.subscribers.splice(index, 1);
    };
  };

  publish = (data: Toast[]) => {
    this.subscribers.forEach((subscriber) => subscriber(data));
  };

  addToast = (data: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const toastItem = { id, ...data };
    this.toasts = [toastItem, ...this.toasts];
    this.publish(this.toasts);
    return id;
  };

  dismiss = (id: string) => {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.publish(this.toasts);
  };

  info = (message: string, data?: Partial<Toast>) => {
    this.addToast({ title: message, ...data, type: 'info' });
  };

  success = (message: string, data?: Partial<Toast>) => {
    this.addToast({ title: message, ...data, type: 'success' });
  };

  error = (message: string, data?: Partial<Toast>) => {
    this.addToast({ title: message, ...data, type: 'error' });
  };

  loading = (message: string, data?: Partial<Toast>) => {
    return this.addToast({
      title: message,
      ...data,
      type: 'loading',
      duration: Infinity,
    });
  };
}

export const toast = new ToastObserver();

const ToastIcon = ({ type }: { type?: ToastType }) => {
  switch (type) {
    case 'success':
      return <Check className="h-4 w-4 text-signal-green" />;
    case 'error':
      return <AlertCircle className="h-4 w-4 text-alert-red" />;
    case 'warning':
      return <AlertCircle className="h-4 w-4 text-amber-500" />;
    case 'loading':
      return <Loader2 className="h-4 w-4 animate-spin text-ash" />;
    default:
      return <Info className="h-4 w-4 text-vantor-blue" />;
  }
};

const getProgressColor = (type?: ToastType): string => {
  switch (type) {
    case 'success':
      return 'bg-signal-green';
    case 'error':
      return 'bg-alert-red';
    case 'warning':
      return 'bg-amber-500';
    default:
      return 'bg-vantor-blue';
  }
};

function ToastItem({ t }: { t: Toast }) {
  const totalDuration = t.duration ?? 4000;
  const isInfinite = !isFinite(totalDuration as number);

  const [progress, setProgress] = useState(100);
  const remainingRef = useRef(totalDuration as number);
  const startTimeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    timeoutRef.current = setTimeout(
      () => toast.dismiss(t.id),
      remainingRef.current,
    );

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = remainingRef.current - elapsed;
      setProgress(Math.max(0, (remaining / (totalDuration as number)) * 100));
      if (remaining > 0) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [t.id, totalDuration]);

  const pauseTimer = useCallback(() => {
    remainingRef.current = Math.max(
      0,
      remainingRef.current - (Date.now() - startTimeRef.current),
    );
    clearTimeout(timeoutRef.current);
    cancelAnimationFrame(rafRef.current);
  }, []);

  const resumeTimer = useCallback(() => startTimer(), [startTimer]);

  useEffect(() => {
    if (isInfinite) return;
    startTimer();
    return () => {
      clearTimeout(timeoutRef.current);
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.1 } }}
      onMouseEnter={isInfinite ? undefined : pauseTimer}
      onMouseLeave={isInfinite ? undefined : resumeTimer}
      className={cn(
        'layout-group pointer-events-auto relative w-full overflow-hidden',
        'rounded-xl border border-gunmetal/30 bg-obsidian p-4 shadow-2xl shadow-void-black/50',
        'flex items-start gap-3 backdrop-blur-xl',
      )}
    >
      <div className="mt-0.5 shrink-0">
        <ToastIcon type={t.type} />
      </div>
      <div className="flex-1 space-y-1">
        {t.title && (
          <p className="text-sm font-medium text-titanium">{t.title}</p>
        )}
        {t.description && <p className="text-xs text-ash">{t.description}</p>}
        {t.action && (
          <div className="pt-2">
            <button
              onClick={() => {
                t.action?.onClick();
                toast.dismiss(t.id);
              }}
              className="w-max rounded-md border border-white/5 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/15 active:scale-95"
            >
              {t.action.label}
            </button>
          </div>
        )}
      </div>
      <button
        onClick={() => toast.dismiss(t.id)}
        className="mt-0.5 rounded-md p-1 text-ash transition-colors hover:bg-gunmetal/20 hover:text-titanium"
      >
        <X className="h-3.5 w-3.5" />
      </button>
      {!isInfinite && (
        <div
          className={cn(
            'absolute bottom-0 left-0 h-[3px]',
            getProgressColor(t.type),
          )}
          style={{ width: `${progress}%` }}
        />
      )}
    </motion.div>
  );
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    return toast.subscribe((newToasts) => {
      setToasts([...newToasts]);
    });
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-[420px] flex-col items-end gap-2 p-4">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <ToastItem key={t.id} t={t} />
        ))}
      </AnimatePresence>
    </div>
  );
}

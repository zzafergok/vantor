'use client';

import { AlertCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

interface FormErrorProps {
  message?: string;
  className?: string;
}

export function FormError({ message, className }: FormErrorProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        'text-destructive mt-1 flex items-center gap-2 text-sm',
        className,
      )}
    >
      <AlertCircle className="h-3 w-3 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}

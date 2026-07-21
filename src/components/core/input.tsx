'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-sm border border-gunmetal/80 bg-void-black px-3 py-2 font-mono text-sm text-titanium transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-ash/40 focus-visible:border-vantor-blue/70 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40',
          error && 'border-alert-red/60',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };

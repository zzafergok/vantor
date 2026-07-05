'use client';

import { ReactNode } from 'react';

import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/core/button';
import { LoadingSpinner } from '@/components/core/loading-spinner';

import { cn } from '@/lib/utils';

interface SubmitButtonProps {
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  loadingText?: string;
  children?: ReactNode;
  disableIfNoChanges?: boolean;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
}

export function SubmitButton({
  icon,
  className,
  size = 'default',
  disabled = false,
  children = 'Submit',
  variant = 'default',
  disableIfNoChanges = false,
  loadingText = 'Submitting...',
}: SubmitButtonProps) {
  const {
    formState: { isSubmitting, isDirty },
  } = useFormContext();

  const isDisabled =
    disabled || isSubmitting || (disableIfNoChanges && !isDirty);

  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      disabled={isDisabled}
      className={cn('w-full sm:w-auto', className)}
    >
      {isSubmitting ? (
        <>
          <LoadingSpinner size="sm" className="mr-2" />
          <span className="text-xs sm:text-sm">{loadingText}</span>
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          <span className="text-xs sm:text-sm">{children}</span>
        </>
      )}
    </Button>
  );
}

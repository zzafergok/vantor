'use client';

import { AlertCircle } from 'lucide-react';
import { useFormContext, Controller } from 'react-hook-form';

import { Label } from '@/components/core/label';
import { Switch } from '@/components/core/switch';

import { cn } from '@/lib/utils';

interface SwitchFieldProps {
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  description?: string;
}

export function SwitchField({
  name,
  label,
  disabled,
  className,
  description,
  required = false,
}: SwitchFieldProps) {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const error = name.split('.').reduce((obj: any, key) => obj?.[key], errors);

  const isDisabled = disabled || isSubmitting;

  return (
    <div className={cn('space-y-1.5 sm:space-y-2', className)}>
      <div className="flex items-start space-x-2 sm:space-x-3">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Switch
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={isDisabled}
              className={cn(error && 'border-alert-red')}
            />
          )}
        />
        <div className="flex-1 space-y-1">
          <Label
            htmlFor={name}
            className={cn(
              'cursor-pointer text-xs font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-sm',
            )}
          >
            {label} {required && <span className="text-vantor-blue">*</span>}
          </Label>
          {description && !error && (
            <p className="text-[10px] text-ash/60 sm:text-xs">{description}</p>
          )}
          {error && (
            <p className="flex items-center gap-1 text-[10px] text-alert-red sm:text-xs">
              <AlertCircle className="h-3 w-3" />
              {error.message as string}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

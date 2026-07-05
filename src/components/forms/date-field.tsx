'use client';

import { AlertCircle } from 'lucide-react';
import { useFormContext, Controller } from 'react-hook-form';

import { Label } from '@/components/core/label';
import { ModernDatePicker } from '@/components/core/modern-date-picker';

import { cn } from '@/lib/utils';

interface DateFieldProps {
  name: string;
  label: string;
  minDate?: Date;
  maxDate?: Date;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  clearable?: boolean;
  placeholder?: string;
  description?: string;
  includeTime?: boolean;
}

export function DateField({
  name,
  label,
  minDate,
  maxDate,
  disabled,
  className,
  placeholder,
  description,
  required = false,
  clearable = true,
  includeTime = false,
}: DateFieldProps) {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const error = name.split('.').reduce((obj: any, key) => obj?.[key], errors);

  const isDisabled = disabled || isSubmitting;

  return (
    <div className={cn('space-y-1.5 sm:space-y-2', className)}>
      <Label
        htmlFor={name}
        className="font-mono text-[10px] uppercase tracking-wider text-ash"
      >
        {label} {required && <span className="text-arcly-blue">*</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ModernDatePicker
            value={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
            disabled={isDisabled}
            minDate={minDate}
            maxDate={maxDate}
            clearable={clearable}
            includeTime={includeTime}
            error={!!error}
            className="text-xs sm:text-sm"
          />
        )}
      />
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
  );
}

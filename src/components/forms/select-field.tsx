'use client';

import { AlertCircle } from 'lucide-react';
import { useFormContext, Controller } from 'react-hook-form';

import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/components/core/select';
import { Label } from '@/components/core/label';

import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectFieldProps {
  name: string;
  label: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  noneLabel?: string;
  allowNone?: boolean;
  placeholder?: string;
  description?: string;
  options: SelectOption[];
}

export function SelectField({
  name,
  label,
  options,
  disabled,
  className,
  description,
  required = false,
  allowNone = false,
  noneLabel = 'None',
  placeholder = 'Select...',
}: SelectFieldProps) {
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
        {label} {required && <span className="text-vantor-blue">*</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            value={field.value ? String(field.value) : allowNone ? 'none' : ''}
            onValueChange={(value) => {
              if (value === 'none' && allowNone) {
                field.onChange(null);
              } else {
                field.onChange(value);
              }
            }}
            disabled={isDisabled}
          >
            <SelectTrigger
              id={name}
              className={cn('text-xs', error && 'border-alert-red/50')}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {allowNone && (
                <SelectItem value="none" className="text-xs">
                  {noneLabel}
                </SelectItem>
              )}
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className="text-xs"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {description && !error && (
        <p className="font-mono text-[10px] text-ash/60">{description}</p>
      )}
      {error && (
        <p className="flex items-center gap-1 font-mono text-[10px] text-alert-red">
          <AlertCircle className="h-3 w-3" />
          {error.message as string}
        </p>
      )}
    </div>
  );
}

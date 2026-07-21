'use client';

import React, { useState, useMemo } from 'react';

import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/core/popover';
import { Button } from '@/components/core/button';

import { cn } from '@/lib/utils';

interface MonthYearPickerProps {
  value?: string; // Format: "YYYY-MM"
  error?: boolean;
  minDate?: string; // Format: "YYYY-MM"
  maxDate?: string; // Format: "YYYY-MM"
  disabled?: boolean;
  className?: string;
  clearable?: boolean;
  placeholder?: string;
  onChange: (value: string | null) => void;
}

const MONTHS = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
];

const QUICK_DATES = [
  {
    label: 'Bu Ay',
    getValue: () => {
      const now = new Date();
      return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
    },
  },
  {
    label: 'Geçen Ay',
    getValue: () => {
      const now = new Date();
      now.setMonth(now.getMonth() - 1);
      return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
    },
  },
  {
    label: '6 Ay Önce',
    getValue: () => {
      const now = new Date();
      now.setMonth(now.getMonth() - 6);
      return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
    },
  },
  {
    label: '1 Yıl Önce',
    getValue: () => {
      const now = new Date();
      now.setFullYear(now.getFullYear() - 1);
      return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
    },
  },
];

export function MonthYearPicker({
  value,
  minDate,
  maxDate,
  onChange,
  className,
  error = false,
  disabled = false,
  clearable = true,
  placeholder = 'Ay/Yıl seçin',
}: MonthYearPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Parse current value or default to current date
  const currentDate = useMemo(() => {
    if (value) {
      const [year, month] = value.split('-');
      return { year: parseInt(year), month: parseInt(month) - 1 };
    }
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  }, [value]);

  const [currentYear, setCurrentYear] = useState(currentDate.year);

  // Format displayed value
  const displayValue = useMemo(() => {
    if (!value) return placeholder;
    const [year, month] = value.split('-');
    return `${MONTHS[parseInt(month) - 1]} ${year}`;
  }, [value, placeholder]);

  const handleMonthSelect = (monthIndex: number) => {
    const monthStr = (monthIndex + 1).toString().padStart(2, '0');
    const newValue = `${currentYear}-${monthStr}`;
    onChange(newValue);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  const handleQuickDateSelect = (quickDate: (typeof QUICK_DATES)[0]) => {
    const dateValue = quickDate.getValue();
    onChange(dateValue);
    setIsOpen(false);
  };

  const navigateYear = (direction: 'prev' | 'next') => {
    setCurrentYear((prev) => (direction === 'prev' ? prev - 1 : prev + 1));
  };

  const isMonthDisabled = (monthIndex: number) => {
    const monthValue = `${currentYear}-${(monthIndex + 1).toString().padStart(2, '0')}`;
    if (minDate && monthValue < minDate) return true;
    if (maxDate && monthValue > maxDate) return true;
    return false;
  };

  const isMonthSelected = (monthIndex: number) => {
    if (!value) return false;
    const monthValue = `${currentYear}-${(monthIndex + 1).toString().padStart(2, '0')}`;
    return monthValue === value;
  };

  const isCurrentMonth = (monthIndex: number) => {
    const now = new Date();
    return now.getFullYear() === currentYear && now.getMonth() === monthIndex;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'h-10 w-full justify-start px-3 py-2 text-left font-normal',
            !value && 'text-ash/70',
            error && 'border-alert-red focus:border-alert-red',
            'hover:bg-gunmetal/10',
            'transition-all duration-200',
            className,
          )}
          disabled={disabled}
        >
          <Calendar className="mr-2 h-4 w-4 shrink-0 text-ash" />
          <span className="truncate">{displayValue}</span>
          {clearable && value && !disabled && (
            <X
              className="ml-auto h-4 w-4 shrink-0 text-ash transition-colors hover:text-titanium"
              onClick={handleClear}
            />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto border border-gunmetal p-0 shadow-lg"
        align="start"
      >
        <div className="flex">
          {/* Quick dates sidebar */}
          <div className="min-w-[120px] border-r border-gunmetal p-3">
            <div className="mb-2 text-xs font-bold uppercase tracking-wide text-ash/70">
              Hızlı Seçim
            </div>
            <div className="space-y-1">
              {QUICK_DATES.map((quickDate, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-full justify-start px-2 text-xs font-normal hover:bg-vantor-blue/10"
                  onClick={() => handleQuickDateSelect(quickDate)}
                >
                  {quickDate.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Month/Year picker */}
          <div className="min-w-[280px] p-3">
            {/* Year navigation */}
            <div className="mb-4 flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateYear('prev')}
                className="h-8 w-8 p-0 hover:bg-gunmetal/20"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="min-w-[80px] text-center text-lg font-semibold text-titanium">
                {currentYear}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateYear('next')}
                className="h-8 w-8 p-0 hover:bg-gunmetal/20"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Months grid */}
            <div className="grid grid-cols-3 gap-2">
              {MONTHS.map((month, index) => {
                const selected = isMonthSelected(index);
                const current = isCurrentMonth(index);
                const disabled = isMonthDisabled(index);

                return (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'relative flex h-10 items-center justify-center px-3 text-sm font-normal',
                      'text-titanium hover:bg-gunmetal/20',
                      selected &&
                        'bg-vantor-blue text-white hover:bg-vantor-blue/90',
                      current &&
                        !selected &&
                        'border border-vantor-blue/20 bg-vantor-blue/10 text-vantor-blue',
                      disabled && 'cursor-not-allowed opacity-50',
                    )}
                    onClick={() => !disabled && handleMonthSelect(index)}
                    disabled={disabled}
                  >
                    {month}
                    {current && !selected && (
                      <div className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 transform rounded-full bg-vantor-blue" />
                    )}
                  </Button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between border-t border-gunmetal pt-3">
              <div className="text-xs text-ash">
                {value ? displayValue : 'Ay/Yıl seçilmedi'}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="h-7 px-3 text-xs"
              >
                Tamam
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

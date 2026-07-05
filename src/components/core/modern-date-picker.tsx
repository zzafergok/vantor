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

interface ModernDatePickerProps {
  minDate?: Date;
  maxDate?: Date;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  compact?: boolean;
  value?: Date | null;
  clearable?: boolean;
  placeholder?: string;
  includeTime?: boolean;
  onChange: (date: Date | null) => void;
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

const DAYS = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pa'];

const QUICK_DATES = [
  { label: 'Bugün', getValue: () => new Date() },
  {
    label: 'Yarın',
    getValue: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    label: '1 Hafta Sonra',
    getValue: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
  {
    label: '2 Hafta Sonra',
    getValue: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  },
  {
    label: '1 Ay Sonra',
    getValue: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
];

export function ModernDatePicker({
  value,
  onChange,
  placeholder = 'Tarih seçin',
  disabled = false,
  clearable = true,
  minDate,
  maxDate,
  className,
  compact = false,
  error = false,
  includeTime = false,
}: ModernDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    value?.getMonth() ?? new Date().getMonth(),
  );
  const [currentYear, setCurrentYear] = useState(
    value?.getFullYear() ?? new Date().getFullYear(),
  );

  // Format displayed date
  const displayValue = useMemo(() => {
    if (!value) return placeholder;
    return value.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, [value, placeholder]);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    const endDate = new Date(lastDay);

    // Adjust to start from Monday
    const startDay = (firstDay.getDay() + 6) % 7;
    startDate.setDate(firstDay.getDate() - startDay);

    // Adjust to end on Sunday
    const endDay = (lastDay.getDay() + 6) % 7;
    endDate.setDate(lastDay.getDate() + (6 - endDay));

    const days = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  }, [currentMonth, currentYear]);

  const handleDateSelect = (date: Date) => {
    if (includeTime) {
      // Set time to start of day (00:00:00.000Z) for consistent ISO datetime format
      const dateWithTime = new Date(date);
      dateWithTime.setHours(0, 0, 0, 0);
      onChange(dateWithTime);
    } else {
      onChange(date);
    }
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  const handleQuickDateSelect = (quickDate: (typeof QUICK_DATES)[0]) => {
    const date = quickDate.getValue();
    if (includeTime) {
      // Set time to start of day (00:00:00.000Z) for consistent ISO datetime format
      date.setHours(0, 0, 0, 0);
    }
    onChange(date);
    setIsOpen(false);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isDateSelected = (date: Date) => {
    if (!value) return false;
    return date.toDateString() === value.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
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
        className={cn(
          'z-[150] max-w-[calc(100vw-2rem)] border border-gunmetal p-0 shadow-lg',
          compact
            ? 'w-[min(calc(100vw-2rem),18rem)]'
            : 'w-[min(calc(100vw-2rem),24rem)]',
        )}
        align="end"
        sideOffset={8}
        collisionPadding={12}
      >
        <div
          className={cn('flex', compact ? 'flex-col' : 'flex-col sm:flex-row')}
        >
          {/* Quick dates sidebar */}
          <div
            className={cn(
              'border-gunmetal p-3',
              compact
                ? 'border-b'
                : 'border-b sm:w-32 sm:shrink-0 sm:border-b-0 sm:border-r',
            )}
          >
            <div className="mb-2 text-xs font-bold uppercase tracking-wide text-ash/70">
              Hızlı Seçim
            </div>
            <div
              className={cn(
                compact
                  ? 'grid grid-cols-2 gap-1'
                  : 'grid grid-cols-2 gap-1 sm:block sm:space-y-1',
              )}
            >
              {QUICK_DATES.map((quickDate, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-full justify-start truncate px-2 text-[11px] font-normal hover:bg-arcly-blue/10"
                  onClick={() => handleQuickDateSelect(quickDate)}
                >
                  {quickDate.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Calendar */}
          <div className="min-w-0 p-3">
            {/* Calendar header */}
            <div className="mb-4 flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth('prev')}
                className="h-8 w-8 p-0 hover:bg-gunmetal/20"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="min-w-0 flex-1 text-center text-sm font-semibold text-titanium">
                {MONTHS[currentMonth]} {currentYear}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth('next')}
                className="h-8 w-8 p-0 hover:bg-gunmetal/20"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Days header */}
            <div className="mb-2 grid grid-cols-7 gap-1">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="flex h-8 min-w-0 items-center justify-center text-xs font-medium text-ash"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((date, index) => {
                const selected = isDateSelected(date);
                const today = isToday(date);
                const currentMonthDate = isCurrentMonth(date);
                const disabled = isDateDisabled(date);

                return (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'relative h-8 w-full min-w-0 p-0 text-sm font-normal',
                      !currentMonthDate && 'text-ash/30',
                      currentMonthDate &&
                        !selected &&
                        'text-titanium hover:bg-gunmetal/20',
                      selected &&
                        'bg-arcly-blue text-white hover:bg-arcly-blue/90',
                      today &&
                        !selected &&
                        'border border-arcly-blue/20 bg-arcly-blue/10 text-arcly-blue',
                      disabled && 'cursor-not-allowed opacity-50',
                    )}
                    onClick={() => !disabled && handleDateSelect(date)}
                    disabled={disabled}
                  >
                    {date.getDate()}
                    {today && !selected && (
                      <div className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 transform rounded-sm bg-arcly-blue" />
                    )}
                  </Button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between border-t border-gunmetal pt-3">
              <div className="text-xs text-ash">
                {value ? value.toLocaleDateString('tr-TR') : 'Tarih seçilmedi'}
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

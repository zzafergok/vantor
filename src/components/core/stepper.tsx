'use client';

import React from 'react';

import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

interface StepperProps {
  currentStep?: any;
  className?: string;
  activeStep?: number;
  children: React.ReactNode;
}

interface StepperItemProps {
  id?: string;
  step?: number;
  title: string;
  isLast?: boolean;
  isActive?: boolean;
  description?: string;
  isCompleted?: boolean;
  status?: 'current' | 'completed' | 'upcoming';
}

export function Stepper({
  children,
  className,
  currentStep,
  activeStep = 1,
}: StepperProps) {
  const currentActiveStep = activeStep || currentStep || 1;
  return (
    <div className={cn('flex items-center justify-between', className)}>
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              ...child.props,
              step: index + 1,
              isActive: currentActiveStep === index + 1,
              isCompleted: currentActiveStep > index + 1,
              isLast: index === React.Children.count(children) - 1,
            })
          : child,
      )}
    </div>
  );
}

export function StepperItem({
  title,
  isLast,
  isActive,
  step = 1,
  description,
  isCompleted,
}: StepperItemProps) {
  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors',
            {
              'border-vantor-blue bg-vantor-blue text-white':
                isActive || isCompleted,
              'border-gunmetal text-ash': !isActive && !isCompleted,
            },
          )}
        >
          {isCompleted ? <Check className="h-5 w-5" /> : step}
        </div>
        <div className="mt-2 text-center">
          <div
            className={cn('text-xs font-bold uppercase tracking-wider', {
              'text-vantor-blue': isActive,
              'text-titanium': isCompleted,
              'text-ash': !isActive && !isCompleted,
            })}
          >
            {title}
          </div>
          {description && (
            <div
              className={cn('mt-1 text-xs', {
                'text-primary/70': isActive,
                'text-muted-foreground': !isActive,
              })}
            >
              {description}
            </div>
          )}
        </div>
      </div>
      {!isLast && (
        <div
          className={cn('mx-4 h-[2px] w-24 transition-colors', {
            'bg-vantor-blue': isCompleted,
            'bg-gunmetal/30': !isCompleted,
          })}
        />
      )}
    </div>
  );
}

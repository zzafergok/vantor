'use client';

import { ReactNode } from 'react';

import {
  useForm,
  FieldValues,
  FormProvider,
  UseFormReturn,
  DefaultValues,
} from 'react-hook-form';
import { ZodSchema } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface FormProps<T extends FieldValues> {
  id?: string;
  className?: string;
  autoComplete?: 'on' | 'off';
  children: ReactNode;
  schema: ZodSchema<T>;
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => void | Promise<void>;
}

export function Form<T extends FieldValues>({
  id,
  schema,
  onSubmit,
  children,
  className,
  autoComplete,
  defaultValues,
}: FormProps<T>) {
  const methods = useForm<T>({
    // @ts-ignore - zodResolver type incompatibility with ZodSchema generic
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange',
  });

  return (
    <FormProvider {...methods}>
      <form
        id={id}
        onSubmit={methods.handleSubmit(onSubmit)}
        className={className}
        autoComplete={autoComplete}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}

export { useFormContext } from 'react-hook-form';
export type { UseFormReturn, FieldValues };

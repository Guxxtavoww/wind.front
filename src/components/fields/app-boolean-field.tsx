'use client';

import { useMemo } from 'react';
import type { AnyFieldApi } from '@tanstack/react-form';

import { cn } from '@/utils/cn.util';
import { useFieldId } from '@/hooks/use-field-id.hook';

import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { FormItem } from '../ui/form-item';
import { Checkbox } from '../ui/checkbox';
import { FieldInfo } from '../app/field-info';

export interface IAppBooleanFieldProps {
  field: AnyFieldApi;
  label: string;
  type: 'switch' | 'checkbox';
  className?: string;
}

export function AppBooleanField({
  field,
  label,
  type = 'checkbox',
  className,
}: IAppBooleanFieldProps) {
  const fieldId = useFieldId(field.name);
  const Comp = type === 'checkbox' ? Checkbox : Switch;

  const isSubmitting = useMemo(
    () => field.form.state.isSubmitting,
    [field.form.state]
  );

  return (
    <FormItem>
      <div className={cn('flex gap-2 items-center', className)}>
        <Label htmlFor={fieldId} aria-disabled={isSubmitting}>
          {label}
        </Label>
        <Comp
          checked={field.state.value}
          onCheckedChange={field.handleChange}
          onBlur={field.handleBlur}
          name={field.name}
          id={fieldId}
          disabled={isSubmitting}
        />
      </div>
      <FieldInfo field={field} />
    </FormItem>
  );
}

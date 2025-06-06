'use client';

import type { AnyFieldApi } from '@tanstack/react-form';

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
}

export function AppBooleanField({
  field,
  label,
  type = 'checkbox',
}: IAppBooleanFieldProps) {
  const fieldId = useFieldId(field.name);
  const Comp = type === 'checkbox' ? Checkbox : Switch;

  return (
    <FormItem>
      <Label htmlFor={fieldId}>{label}</Label>
      <Comp
        checked={field.state.value}
        onCheckedChange={field.handleChange}
        onBlur={field.handleBlur}
        name={field.name}
        id={fieldId}
      />
      <FieldInfo field={field} />
    </FormItem>
  );
}

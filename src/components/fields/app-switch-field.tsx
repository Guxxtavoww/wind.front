'use client';

import type { AnyFieldApi } from '@tanstack/react-form';

import { useFieldId } from '@/hooks/use-field-id.hook';

import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { FormItem } from '../ui/form-item';
import { FieldInfo } from '../app/field-info';

export interface IAppSwitchFieldProps {
  field: AnyFieldApi;
  label: string;
}

export function AppSwitchField({
  field,
  label,
}: IAppSwitchFieldProps) {
  const fieldId = useFieldId(field.name);

  return (
    <FormItem>
      <Label htmlFor={fieldId}>{label}</Label>
      <Switch
        checked={field.state.value}
        onCheckedChange={field.handleChange}
        onBlur={field.handleBlur}
        name={field.name}
      />
      <FieldInfo field={field} />
    </FormItem>
  );
}

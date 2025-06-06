import { clsx, type ClassValue } from 'clsx';
import { useCallback, useMemo } from 'react';
import type { AnyFieldApi } from '@tanstack/react-form';

import { useFieldId } from '@/hooks/use-field-id.hook';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { FormItem } from '../ui/form-item';
import { FieldInfo } from '../app/field-info';

// Base interface with common props
export interface IAppInputFieldBaseProps {
  field: AnyFieldApi;
  label?: string;
  placeholder: string;
  formItemClassName?: ClassValue;
  autoFocus?: boolean;
}

// Text/textarea variant with maskFn
export interface IAppInputFieldTextProps extends IAppInputFieldBaseProps {
  type: 'text' | 'textarea';
  maskFn?: (value: string) => string;
}

// Number variant without maskFn
export interface IAppInputFieldNumberProps extends IAppInputFieldBaseProps {
  type: 'number';
}

// Discriminated union type
export type AppInputFieldProps =
  | IAppInputFieldTextProps
  | IAppInputFieldNumberProps;

export function AppInputField({
  field,
  type,
  label,
  placeholder,
  autoFocus,
  formItemClassName,
  ...props
}: AppInputFieldProps) {
  const fieldId = useFieldId(field.name);

  const isNumberInput = useMemo(() => type === 'number', [type]);

  const isSubmitting = useMemo(
    () => field.form.state.isSubmitting,
    [field.form.state]
  );

  const applyMask = useCallback(
    (value: string) => {
      if (isNumberInput) return value;

      if (!('maskFn' in props) || !props.maskFn) return value;

      const maskedValue = props.maskFn(value);

      if (!maskedValue && value.length) return value;

      return maskedValue;
    },
    [isNumberInput, props]
  );

  return (
    <FormItem className={clsx(formItemClassName)}>
      {label ? (
        <Label htmlFor={fieldId} aria-disabled={isSubmitting}>
          {label}
        </Label>
      ) : null}
      {type === 'textarea' ? (
        <Textarea
          id={fieldId}
          name={field.name}
          placeholder={placeholder}
          value={field.state.value}
          onBlur={field.handleBlur}
          autoComplete={`current-${field.name}`}
          onChange={(e) => field.handleChange(applyMask(e.target.value))}
          autoFocus={autoFocus}
          disabled={isSubmitting}
        />
      ) : (
        <Input
          id={fieldId}
          name={field.name}
          placeholder={placeholder}
          value={field.state.value}
          onBlur={field.handleBlur}
          type={type}
          autoComplete={`current-${field.name}`}
          autoFocus={autoFocus}
          disabled={isSubmitting}
          onChange={(e) => {
            let value: string | number = e.target.value;

            if (isNumberInput) {
              if (value === '') {
                field.handleChange(undefined);

                return;
              }

              if (Number.isNaN(Number(value))) return;

              value = Number(value);
            }

            field.handleChange(
              isNumberInput ? value : applyMask(String(value))
            );
          }}
        />
      )}
      <FieldInfo field={field} />
    </FormItem>
  );
}

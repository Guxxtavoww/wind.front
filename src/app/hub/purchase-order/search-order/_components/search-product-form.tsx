'use client';

import { z } from 'zod';
import { Search } from 'lucide-react';

import { stringSchema } from '@/utils/zod.utils';
import { AppForm } from '@/components/app/app-form';
import { useAppForm } from '@/hooks/use-app-form.hook';
import { AppInputFieldWithIcons } from '@/components/fields/app-input-field-with-icons';

const searchProductFormSchema = z.strictObject({
  product_name: stringSchema.optional(),
});

type SearchProductFormType = z.infer<typeof searchProductFormSchema>;

export function SearchProductForm() {
  const form = useAppForm({
    validators: {
      onChange: searchProductFormSchema,
      onSubmit: searchProductFormSchema,
    },
    defaultValues: {} as SearchProductFormType,
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <AppForm form={form} className="w-full px-6 mb-5">
      <form.AppField
        name="product_name"
        children={(field) => (
          <AppInputFieldWithIcons
            field={field}
            placeholder="Insira o nome do produto"
            type="text"
            label="Nome do produto"
            leftIcon={Search}
            className="w-full"
          />
        )}
      />
    </AppForm>
  );
}

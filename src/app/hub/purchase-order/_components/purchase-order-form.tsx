'use client';

import { z } from 'zod';

import {
  stringSchema,
  booleanSchema,
  integerNumberSchema,
} from '@/utils/zod.utils';
import { AppForm } from '@/components/app/app-form';
import { useAppForm } from '@/hooks/use-app-form.hook';
import { AppInputField } from '@/components/fields/app-input-field';
import { AppBooleanField } from '@/components/fields/app-boolean-field';

const purchaseOrderFormSchema = z.strictObject({
  product: stringSchema,
  quantity: integerNumberSchema,
  internal_code: stringSchema,
  branch: stringSchema, //filial
  solicitor: stringSchema,
  budget_description: stringSchema,
  observation: stringSchema.optional(),
  is_urgent: booleanSchema,
  is_contract: booleanSchema,
});

export type PurchaseOrderFormType = z.infer<typeof purchaseOrderFormSchema>;

export function PurchaseOrderForm() {
  const form = useAppForm({
    validators: {
      onChange: purchaseOrderFormSchema,
      onSubmit: purchaseOrderFormSchema,
    },
    defaultValues: {} as PurchaseOrderFormType,
    onSubmit: ({ value }) => {
      console.log(JSON.stringify(value, null, 2));
    },
  });

  return (
    <AppForm
      form={form}
      className="grid grid-cols-2 w-full min-h-[calc(100svh-10rem)] bg-widget-bg rounded-md p-14 gap-x-6"
    >
      <form.AppField
        name="product"
        children={(field) => (
          <AppInputField
            type="text"
            field={field}
            placeholder="Insira o produto"
            label="Produto"
            autoFocus
          />
        )}
      />
      <form.AppField
        name="quantity"
        children={(field) => (
          <AppInputField
            type="number"
            field={field}
            placeholder="Insira a quantidade"
            label="Quantidade"
          />
        )}
      />
      <form.AppField
        name="internal_code"
        children={(field) => (
          <AppInputField
            type="text"
            field={field}
            placeholder="Insira o código interno"
            label="Código Interno"
          />
        )}
      />
      <form.AppField
        name="branch"
        children={(field) => (
          <AppInputField
            type="text"
            field={field}
            placeholder="Insira a Filial"
            label="Filial"
          />
        )}
      />
      <form.AppField
        name="solicitor"
        children={(field) => (
          <AppInputField
            type="text"
            field={field}
            placeholder="Insira o Solicitante"
            label="Solicitante"
          />
        )}
      />
      <form.AppField
        name="budget_description"
        children={(field) => (
          <AppInputField
            type="text"
            field={field}
            placeholder="Insira a descrição do orçamento"
            label="Desc. Orçamento"
          />
        )}
      />
      <form.AppField
        name="observation"
        children={(field) => (
          <AppInputField
            type="textarea"
            field={field}
            placeholder="Insira uma observação"
            label="Obs"
          />
        )}
      />
      <form.AppField
        name="is_urgent"
        children={(field) => (
          <AppBooleanField type="switch" field={field} label="Urgente*" />
        )}
      />
      <form.AppField
        name="is_contract"
        children={(field) => (
          <AppBooleanField
            type="checkbox"
            field={field}
            label="Contrato"
            className="!flex-row !items-center"
          />
        )}
      />

      <form.AppForm>
        <form.Button className="w-full col-span-2 rounded-full">
          Finalizar
        </form.Button>
      </form.AppForm>
    </AppForm>
  );
}

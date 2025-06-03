import { z } from 'zod';
import { useAppForm } from '@/hooks/use-app-form.hook';
import { AppInputField } from '../fields/app-input-field';
import { AppForm } from './app-form';
import { integerNumberSchema, stringSchema } from '@/utils/zod.utils';

const exampleFormSchema = z.strictObject({
  name: stringSchema,
  age: integerNumberSchema,
});

type ExampleFormType = z.infer<typeof exampleFormSchema>;

export function FormExample() {
  const form = useAppForm({
    validators: {
      onChange: exampleFormSchema,
      onSubmit: exampleFormSchema,
    },
    defaultValues: {} as ExampleFormType,
    onSubmit: ({ value }) => {
      alert(JSON.stringify(value, null, 2));
    },
  });

  return (
    <AppForm form={form} className="space-y-2">
      <form.AppField
        name="name"
        children={(field) => (
          <AppInputField
            type="text"
            field={field}
            placeholder="Seu nome"
            label="Nome"
          />
        )}
      />
      <form.AppField
        name="age"
        children={(field) => (
          <AppInputField
            field={field}
            type="number"
            placeholder="Sua Idade"
            label="Idade:"
          />
        )}
      />
      <form.AppForm>
        <form.Button>Aperta</form.Button>
      </form.AppForm>
    </AppForm>
  );
}

import { z, type ZodSchema, type ZodTypeDef } from 'zod';
import { isPossiblePhoneNumber } from 'libphonenumber-js';

import { isValidCNPJ, isValidCPF } from './cpf-cnpj.utils';
import { isNullableValue } from './is-nullable-value.util';

export function createNullableTransform<
  TOutput = any,
  TDef extends ZodTypeDef = ZodTypeDef,
  TInput = TOutput,
>(schema: ZodSchema<TOutput, TDef, TInput>) {
  return schema
    .optional()
    .nullable()
    .transform((value) => (isNullableValue(value) ? undefined : value));
}

/**
 * -----------------------------------------------------------------------------
 * Default Schemas
 * -----------------------------------------------------------------------------
 */
export const numberSchema = z.number({ message: 'Valor numérico obrigatório' });
export const stringSchema = z
  .string({
    message: 'Obrigatório',
  })
  .trim()
  .nonempty('Esse texto não pode estar vazio');
export const emailStringSchema = stringSchema.email('E-mail inválido');
export const urlStringSchema = stringSchema.url('Url inválida');
export const uuidSchema = stringSchema.uuid();
export const ipStringSchema = stringSchema.ip();

export const sortSchema = stringSchema
  .regex(/^.+\.(ASC|DESC|asc|desc)$/, 'Formato inválido')
  .transform((val) => val as `${string}.${'ASC' | 'DESC' | 'asc' | 'desc'}`);

export const integerNumberSchema = numberSchema.int(
  'Esse número não pode ser quebrado',
);

export const floatNumberSchema = numberSchema.transform((value) =>
  parseFloat(String(value)),
);

export const booleanSchema = z.boolean();

export const stringToNumberSchema = stringSchema
  .refine((value) => !Number.isNaN(+value))
  .transform(Number);

export const cpfOrCnpjStringSchema = stringSchema.refine(
  (value) => {
    const digitsOnly = value.replace(/\D/g, '');

    if (digitsOnly.length === 11) {
      return isValidCPF(digitsOnly);
    } else if (digitsOnly.length === 14) {
      return isValidCNPJ(digitsOnly);
    }

    return false;
  },
  { message: 'Cpf ou cnpj inválido' },
);

export const stringToIntegerSchema = stringSchema
  .refine(
    (str) => {
      const numberfyedValue = Number(str);

      if (Number.isNaN(numberfyedValue)) return false;

      return Number.isInteger(numberfyedValue);
    },
    { message: 'O valor deve ser inteiro' },
  )
  .transform(Number);

export const stringToFloatSchema = stringSchema
  .refine(
    (str) => {
      const numberfyedValue = Number(str);

      if (Number.isNaN(numberfyedValue)) return false;

      return true;
    },
    { message: 'O valor deve ser um número válido' },
  )
  .transform((value) => parseFloat(value));

export const paginationParamSchema = z
  .union([stringSchema, integerNumberSchema])
  .refine((value) => !Number.isNaN(+value))
  .transform(Number)
  .refine((value) => value > 0, { message: 'O valor deve ser maior que 0' });

export const booleanStringSchema = z
  .enum(['true', 'false'])
  .transform((value) => value === 'true');

export const phoneNumberStringSchema = stringSchema
  .refine(isPossiblePhoneNumber, 'Telefone inválido')
  .transform((value) => value.replace(/[()\s-]/g, ''));

export const timeStringSchema = stringSchema.time({ precision: 3 });

export const datetimeStringSchema = stringSchema.datetime({
  local: true,
  message: 'Data inválida',
});

export const dateStringSchema = stringSchema.date('Data inválida');

export const passwordSchema = stringSchema
  .min(8, 'Password must be at least 8 characters long')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]+$/,
    'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
  );

export const zipCodeStringSchema = stringSchema
  .regex(/^\d{5}-?\d{3}$/, 'O CEP deve estar no formato XXXXX-XXX ou XXXXXXXX')
  .transform((value) => value.replace(/-/g, ''))
  .refine((value) => !/^(\d)\1{7}$/.test(value), {
    message:
      'O CEP não pode ter todos os mesmos dígitos (por exemplo, 11111111)',
  });

export const futureDatetimeSchema = datetimeStringSchema.refine(
  (datetime) => {
    const datefyedValue = new Date(datetime);
    const currentDate = new Date();

    // Verifica se a data inserida é posterior à data atual
    return datefyedValue > currentDate;
  },
  { message: 'A data deve ser no futuro' },
);

/**
 * -----------------------------------------------------------------------------
 * Optional Schemas
 * -----------------------------------------------------------------------------
 */
export const optionalEmailStringSchema =
  createNullableTransform(emailStringSchema);

export const optionalStringSchema = createNullableTransform(stringSchema);

export const optionalCpfOrCnpjStringSchema = createNullableTransform(
  cpfOrCnpjStringSchema,
);

export const optionalZipCodeStringSchema =
  createNullableTransform(zipCodeStringSchema);

export const optionalStringToNumberSchema =
  createNullableTransform(stringToNumberSchema);

export const optionalPasswordSchema = createNullableTransform(passwordSchema);

export const optionalPhoneNumberStringSchema = createNullableTransform(
  phoneNumberStringSchema,
);

export const optionalUuidSchema = createNullableTransform(uuidSchema);

export const optionalUrlStringSchema = createNullableTransform(urlStringSchema);

export const optionalIntegerNumberSchema =
  createNullableTransform(integerNumberSchema);

export const optionalFloatNumberSchema =
  createNullableTransform(floatNumberSchema);

export const optionalPaginationParamSchema = createNullableTransform(
  paginationParamSchema,
);

export const optionalSortSchema = createNullableTransform(sortSchema);

export const optionalTimeStringSchema =
  createNullableTransform(timeStringSchema);

export const optionalDatetimeStringSchema =
  createNullableTransform(datetimeStringSchema);

export const optionalFutureDatetimeSchema =
  createNullableTransform(futureDatetimeSchema);

export const optionalDateStringSchema =
  createNullableTransform(dateStringSchema);

export const optionalBooleanStringSchema =
  createNullableTransform(booleanStringSchema);

export const optionalBooleanSchema = createNullableTransform(booleanSchema);

export const optionalStringToFloatSchema =
  createNullableTransform(stringToFloatSchema);

export const optionalStringToIntegerSchema = createNullableTransform(
  stringToIntegerSchema,
);

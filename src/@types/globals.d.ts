/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { ReactNode, Dispatch, SetStateAction } from 'react';
import type { ColumnSort } from '@tanstack/react-table';

import type { DataTableConfig } from '@/components/app/data-table/utils';

declare global {
  export type NullableValue<T> = T | null;

  export type Maybe<T> = NullableValue<T> | undefined;

  type NonNullableObject<Obj extends object> = {
    [K in keyof Obj as Obj[K] extends null | undefined
      ? never
      : K]: NonNullable<Obj[K]>;
  };

  type AutoOmit<T, K extends keyof T> = Omit<T, K>;

  export type WithChildren<T extends object = {}> = Readonly<
    T & { children: ReactNode }
  >;

  export type SetStateFn<T> = Dispatch<SetStateAction<T>>;

  /**
   * Type for an option in a select or dropdown component.
   */
  export interface Option {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
    withCount?: boolean;
  }

  /**
   * Type for a field used to filter data in a data table.
   * @template TData - The type of the data being filtered.
   */
  export interface DataTableFilterField<TData> {
    label: string;
    value: keyof TData;
    placeholder?: string;
    options?: Option[];
  }

  /**
   * Type for an option used to filter data in a data table.
   * @template TData - The type of the data being filtered.
   */
  export interface DataTableFilterOption<TData> {
    id: string;
    label: string;
    value: keyof TData;
    options: Option[];
    filterValues?: string[];
    filterOperator?: string;
    isMulti?: boolean;
  }

  export interface ExtendedColumnSort<TData> extends Omit<ColumnSort, 'id'> {
    id: Extract<keyof TData, string>;
  }

  export type ObjectKeys<T extends Record<string, unknown>, Key = keyof T> =
    // Check if key is a string.
    Key extends string
      ? // Continue to check if key has nested objects.
        T[Key] extends Record<string, unknown>
        ? // If nested object is found, recursively run the ObjectKeys on it.
          `${Key}.${ObjectKeys<T[Key]>}`
        : // If nested object is not found, return the key.
          `${Key}`
      : // Return nothing.
        never;

  /**
   * Type for an object with string keys and values that are either strings or undefined.
   */
  type ServerComponentRecord = Record<string, string | undefined>;
  /**
   * Props for a server component page, including route parameters and search parameters.
   * @template ParamsType - The type of route parameters.
   * @template SearchParamsType - The type of search parameters.
   */
  export type ServerComponentPageProps<
    ParamsType extends ServerComponentRecord = ServerComponentRecord,
    SearchParamsType extends ServerComponentRecord = ServerComponentRecord
  > = {
    params: ParamsType & { locale: Locale };
    searchParams: SearchParamsType;
  };

  /**
   * Props for an error page component.
   */
  export type ErrorPageProps = {
    error: Error & { digest?: string };
    reset: () => void;
  };

  export type FilterOperator = DataTableConfig['operators'][number];
  export type FilterVariant = DataTableConfig['filterVariants'][number];
  export type JoinOperator = DataTableConfig['joinOperators'][number];
}

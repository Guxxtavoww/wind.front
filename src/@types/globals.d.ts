/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { ReactNode, Dispatch, SetStateAction } from 'react';

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
}

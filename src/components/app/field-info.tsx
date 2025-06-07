import type { AnyFieldApi } from '@tanstack/react-form';

import { Loader } from './loader';

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em className="text-sm text-destructive">
          {[...new Set(field.state.meta.errors.map((err) => err.message))].join(
            ', '
          )}
        </em>
      ) : null}
      {field.state.meta.isValidating ? (
        <span>
          <Loader size="sm" /> Validando...
        </span>
      ) : null}
    </>
  );
}

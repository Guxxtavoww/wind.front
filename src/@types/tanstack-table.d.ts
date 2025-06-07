import type { FC, SVGProps } from 'react';
import type { RowData } from '@tanstack/react-table';

import type { DataTableConfig } from '@/components/app/data-table/utils';

export type FilterVariant = DataTableConfig['filterVariants'][number];

declare module '@tanstack/react-table' {
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  interface ColumnMeta<TData extends RowData, TValue> {
    label?: string;
    placeholder?: string;
    variant?: FilterVariant;
    options?: Option[];
    range?: [number, number];
    unit?: string;
    icon?: FC<SVGProps<SVGSVGElement>>;
  }
}

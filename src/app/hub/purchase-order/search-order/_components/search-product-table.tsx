'use client';

import { useMemo } from 'react';

import { DataTable } from '@/components/app/data-table';
import { useDataTable } from '@/hooks/use-data-table.hook';

import {
  getSearchProductsTableColumns,
  IProduct,
} from './search-product-table-columns';

export function SearchProductTable() {
  const columns = useMemo(() => getSearchProductsTableColumns(), []);

  const { table } = useDataTable<IProduct>({
    columns,
    data: [
      {
        date: '2025-06-07',
        quantity: 10,
        internal_code: 'PRD-001',
        branch: 'New York',
        solicitor: 'Alice Johnson',
        budget_description: 'Monthly restock of office supplies',
      },
      {
        date: '2025-06-06',
        quantity: 5,
        internal_code: 'PRD-002',
        branch: 'Los Angeles',
        solicitor: 'Bob Smith',
      },
      {
        date: '2025-06-05',
        quantity: 20,
        internal_code: 'PRD-003',
        branch: 'Chicago',
        solicitor: 'Clara Evans',
        budget_description: 'Replacement for damaged equipment',
      },
      {
        date: '2025-06-04',
        quantity: 15,
        internal_code: 'PRD-004',
        branch: 'Houston',
        solicitor: 'David Lee',
      },
    ],
    getRowId: (originalRow) => originalRow.internal_code,
    pageCount: 1,
    shallow: false,
    clearOnDefault: true,
    initialState: {
      sorting: [{ id: 'date', desc: true }],
    },
  });

  return <DataTable table={table} className="px-3" hasPagination={false} />;
}

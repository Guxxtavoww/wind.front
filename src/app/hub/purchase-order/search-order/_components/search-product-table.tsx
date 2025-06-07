'use client';

import { useMemo } from 'react';
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { getSearchProductsTableColumns } from './search-product-table-columns';
import { DataTable } from '@/components/app/data-table';

export function SearchProductTable() {
  const columns = useMemo(() => getSearchProductsTableColumns(), []);

  const table = useReactTable({
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
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    enableRowSelection: true,
  });

  return <DataTable table={table} className="mx-3" />;
}

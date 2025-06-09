'use client';

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  type TableOptions,
  type SortingState,
  type RowSelectionState,
  type PaginationState,
} from '@tanstack/react-table';
import { useState } from 'react';

interface UseAppDataTableProps<TData>
  extends AutoOmit<
    TableOptions<TData>,
    | 'onSortingChange'
    | 'onRowSelectionChange'
    | 'onPaginationChange'
    | 'getCoreRowModel'
    | 'getSortedRowModel'
    | 'getPaginationRowModel'
    | 'manualPagination'
  > {
  initialSorting?: SortingState;
  initialRowSelection?: RowSelectionState;
  initialPagination?: PaginationState;
}

export function useAppDataTable<TData>({
  data,
  columns,
  getRowId,
  initialSorting = [],
  initialRowSelection = {},
  initialPagination = { pageIndex: 0, pageSize: 10 },
  ...props
}: UseAppDataTableProps<TData>) {
  // State for sorting, row selection, and pagination
  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [rowSelection, setRowSelection] =
    useState<RowSelectionState>(initialRowSelection);
  const [pagination, setPagination] =
    useState<PaginationState>(initialPagination);

  const table = useReactTable({
    ...props,
    data,
    columns,
    getRowId,
    state: {
      sorting,
      rowSelection,
      pagination,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
  });

  // Get selected rows data
  const selectedRows = table
    .getSelectedRowModel()
    .flatRows.map((row) => row.original);

  // Select/deselect all rows
  const toggleAllRowsSelection = (value: boolean) => {
    if (value) {
      table.toggleAllRowsSelected(true);
    } else {
      table.resetRowSelection();
    }
  };

  return {
    table,
    state: {
      sorting,
      rowSelection,
      pagination,
    },
    selectedRows,
    toggleAllRowsSelection,
    getRowId,
  };
}

'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { LucideIcon } from '@/components/app/lucide-icon';
import { CustomTooltip } from '@/components/app/custom-tooltip';
import { DataTableColumnHeader } from '@/components/app/data-table/data-table-column-header';

export interface IProduct {
  date: string;
  quantity: number;
  internal_code: string;
  branch: string;
  solicitor: string;
  budget_description?: string;
}

export function getSearchProductsTableColumns(): ColumnDef<IProduct>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          // className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40,
    },
    {
      id: 'date',
      accessorKey: 'date',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Data" />
      ),
      cell: ({ row }) => <div className="w-20">{row.getValue('date')}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: 'quantity',
      accessorKey: 'quantity',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Quantidade" />
      ),
      cell: ({ row }) => {
        return (
          <span className="max-w-[31.25rem] truncate font-medium">
            {row.getValue('quantity')}
          </span>
        );
      },
      enableColumnFilter: true,
    },
    {
      id: 'internal_code',
      accessorKey: 'internal_code',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Código Interno" />
      ),
      cell: ({ row }) => <span>{row.getValue('internal_code')}</span>,
    },
    {
      id: 'branch',
      accessorKey: 'branch',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Filial" />
      ),
      cell: ({ row }) => {
        return <span>{row.getValue('branch')}</span>;
      },
    },
    {
      id: 'solicitor',
      accessorKey: 'solicitor',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Solicitante " />
      ),
      cell: ({ row }) => {
        return (
          <div className="w-20 text-right">{row.getValue('solicitor')}</div>
        );
      },
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Desc. Orçament" />
      ),
      cell: ({ cell }) => <span>{cell.getValue<string>() || '-'}</span>,
      enableColumnFilter: true,
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-3">
            <CustomTooltip tooltipText="Deletar">
              <Button size="icon">
                <LucideIcon icon={Search} />
              </Button>
            </CustomTooltip>
          </div>
        );
      },
      size: 40,
    },
  ];
}

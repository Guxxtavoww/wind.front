'use client';

import { ArrowRightFromLine } from 'lucide-react';
import type { Table } from '@tanstack/react-table';

import { cn } from '@/utils/cn.util';
import { Button } from '@/components/ui/button';

import type { ExportType } from './utils';
import { LucideIcon } from '../lucide-icon';
import { CustomTooltip } from '../custom-tooltip';

interface DataTableExcelExportProps<T> {
  table: Table<T>;
  className?: string;
  export_type?: ExportType;
  fileName?: string;
}

export function DataTableExcelExport<T>({
  table,
  className,
  export_type,
  fileName = 'arquivo',
}: DataTableExcelExportProps<T>) {
  async function exportToExcel() {
    const { exportTableToCSV } = await import('./utils');

    exportTableToCSV(table, {
      filename: fileName,
      excludeColumns: ['select', 'actions'],
      export_type,
    });
  }

  return (
    <CustomTooltip tooltipText="Exportar Para Excel">
      <Button
        className={cn('inline-flex items-center gap-2', className)}
        variant="outline"
        onClick={exportToExcel}
      >
        <LucideIcon icon={ArrowRightFromLine} size="sm" />
        Exportar
      </Button>
    </CustomTooltip>
  );
}

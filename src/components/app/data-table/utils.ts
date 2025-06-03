import type { Table, Column } from '@tanstack/react-table';
import { Blend, Square } from 'lucide-react';

export type DataTableConfig = typeof dataTableConfig;

export const dataTableConfig = {
  comparisonOperators: [
    { label: 'Contém', value: 'ilike' as const },
    { label: 'Não contém', value: 'notIlike' as const },
    { label: 'É igual a', value: 'eq' as const },
    { label: 'É diferente de', value: 'notEq' as const },
    { label: 'Começa com', value: 'startsWith' as const },
    { label: 'Termina com', value: 'endsWith' as const },
    { label: 'Está vazio', value: 'isNull' as const },
    { label: 'Não está vazio', value: 'isNotNull' as const },
  ],
  selectableOperators: [
    { label: 'É igual a', value: 'eq' as const },
    { label: 'É diferente de', value: 'notEq' as const },
    { label: 'Está vazio', value: 'isNull' as const },
    { label: 'Não está vazio', value: 'isNotNull' as const },
  ],
  logicalOperators: [
    {
      label: 'E',
      value: 'and' as const,
      description: 'Todas as condições devem ser atendidas',
    },
    {
      label: 'Ou',
      value: 'or' as const,
      description: 'Pelo menos uma condição deve ser atendida',
    },
  ],
  featureFlags: [
    {
      label: 'Filtro avançado',
      value: 'advancedFilter' as const,
      icon: Blend,
      tooltipTitle: 'Ativar/desativar filtro avançado',
      tooltipDescription:
        'Um construtor de consultas semelhante ao Notion para filtrar linhas.',
    },
    {
      label: 'Barra flutuante',
      value: 'floatingBar' as const,
      icon: Square,
      tooltipTitle: 'Ativar/desativar barra flutuante',
      tooltipDescription:
        'Uma barra flutuante que fica fixa no topo da tabela.',
    },
  ],
};

export function getCommonPinningStyles<TData>({
  column,
}: {
  column: Column<TData>;
}): React.CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right');

  return {
    boxShadow: isLastLeftPinnedColumn
      ? '-5px 0 5px -5px hsl(var(--border)) inset'
      : isFirstRightPinnedColumn
      ? '5px 0 5px -5px hsl(var(--border)) inset'
      : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isPinned ? 0.97 : 1,
    position: isPinned ? 'sticky' : 'relative',
    background: isPinned ? 'hsl(var(--background))' : undefined,
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
}

export type ExportType = 'selected' | 'all' | 'default';

interface ExportTableToCSVArgs<TData> {
  filename?: string;
  export_type?: ExportType;
  excludeColumns?: (keyof TData | 'select' | 'actions')[];
}

export function exportTableToCSV<TData>(
  table: Table<TData>,
  {
    filename = 'table',
    excludeColumns = [],
    export_type = 'default',
  }: ExportTableToCSVArgs<TData> = {}
): void {
  const headers = table
    .getAllLeafColumns()
    .map((column) => column.id)
    .filter((id) => !excludeColumns.includes(id as any));

  const defaultRows = table.getRowModel().rows;
  const selectedRows = table.getFilteredSelectedRowModel().rows;

  const rows = (
    export_type === 'default'
      ? selectedRows.length
        ? selectedRows
        : defaultRows
      : export_type === 'all'
      ? defaultRows
      : selectedRows
  ).map((row) =>
    headers
      .map((header) => {
        const cellValue = row.getValue(header);

        return typeof cellValue === 'string'
          ? `"${cellValue.replace(/"/g, '""')}"`
          : cellValue;
      })
      .join(',')
  );

  const csvContent = [headers.join(','), ...rows].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `${filename}.csv`;
  link.style.visibility = 'hidden';

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}

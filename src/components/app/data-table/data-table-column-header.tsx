import { type Column } from '@tanstack/react-table';
import { ArrowDown, ArrowDownUp, ArrowUp, Eye } from 'lucide-react';

import { cn } from '@/utils/cn.util';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort() && !column.getCanHide())
    return <div className={cn(className)}>{title}</div>;

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label={
              column.getIsSorted() === 'desc'
                ? 'Sorted descending. Click to sort ascending.'
                : column.getIsSorted() === 'asc'
                ? 'Sorted ascending. Click to sort descending.'
                : 'Not sorted. Click to sort ascending.'
            }
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getCanSort() && column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 size-4" aria-hidden="true" />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 size-4" aria-hidden="true" />
            ) : (
              <ArrowDownUp className="ml-2 size-4" aria-hidden="true" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {column.getCanSort() && (
            <>
              <DropdownMenuItem
                aria-label="Sort ascending"
                onClick={() => column.toggleSorting(false)}
              >
                <ArrowUp
                  className="mr-2 size-3.5 text-muted-foreground/70"
                  aria-hidden="true"
                />
                Crescente
              </DropdownMenuItem>
              <DropdownMenuItem
                aria-label="Sort descending"
                onClick={() => column.toggleSorting(true)}
              >
                <ArrowDown
                  className="mr-2 size-3.5 text-muted-foreground/70"
                  aria-hidden="true"
                />
                Decrescente
              </DropdownMenuItem>
            </>
          )}
          {column.getCanSort() && column.getCanHide() && (
            <DropdownMenuSeparator />
          )}
          {column.getCanHide() && (
            <DropdownMenuItem
              aria-label="Hide column"
              onClick={() => column.toggleVisibility(false)}
            >
              <Eye
                className="mr-2 size-3.5 text-muted-foreground/70"
                aria-hidden="true"
              />
              Esconder
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

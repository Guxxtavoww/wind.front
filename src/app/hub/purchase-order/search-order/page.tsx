import { Suspense } from 'react';
import type { Metadata } from 'next';

import { DataTableSkeleton } from '@/components/app/data-table/data-table-skeleton';

import { SearchProductForm } from './_components/search-product-form';
import { SearchProductTable } from './_components/search-product-table';

export const metadata: Metadata = {
  title: 'Pesquisar Pedido',
};

export default function SearchOrderPage() {
  return (
    <>
      <SearchProductForm />
      <Suspense fallback={<DataTableSkeleton columnCount={7} />}>
        <SearchProductTable />
      </Suspense>
    </>
  );
}

import { Suspense } from 'react';
import { SearchProductForm } from './_components/search-product-form';
import { SearchProductTable } from './_components/search-product-table';
import { DataTableSkeleton } from '@/components/app/data-table/data-table-skeleton';

export default function SearchOrderPage() {
  return (
    <div className="w-full h-[calc(100svh-10rem)] bg-widget-bg rounded-md py-6">
      <SearchProductForm />
      <Suspense fallback={<DataTableSkeleton columnCount={7} />}>
        <SearchProductTable />
      </Suspense>
    </div>
  );
}

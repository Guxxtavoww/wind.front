import { PurchaseOrderLayout as PurchaseOrderLayoutC } from './_components/purchase-order-layout';

export default async function PurchaseOrderLayout({ children }: WithChildren) {
  return (
    <PurchaseOrderLayoutC>
      <div className="w-full min-h-(--content-height) flex justify-center items-center py-3.5 px-5">
        <div className="w-full !h-[calc(var(--content-height)-2rem)] bg-widget-bg rounded-md py-6">
          {children}
        </div>
      </div>
    </PurchaseOrderLayoutC>
  );
}

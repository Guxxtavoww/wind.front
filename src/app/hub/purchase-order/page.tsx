import type { Metadata } from 'next';

import { PurchaseOrderForm } from './_components/purchase-order-form';

export const metadata: Metadata = {
  title: 'Pedido de Compra',
};

export default function PurchaseOrderPage() {
  return (
    <div className="w-full min-h-(--content-height) flex justify-center items-center p-5">
      <PurchaseOrderForm />
    </div>
  );
}

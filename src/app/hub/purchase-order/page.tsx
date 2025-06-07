import type { Metadata } from 'next';

import { PurchaseOrderForm } from './_components/purchase-order-form';

export const metadata: Metadata = {
  title: 'Pedido de Compra',
};

export default function PurchaseOrderPage() {
  return <PurchaseOrderForm />;
}

import { PurchaseOrderLayout as PurchaseOrderLayoutC } from './_components/purchase-order-layout';

export default async function PurchaseOrderLayout({ children }: WithChildren) {
  return <PurchaseOrderLayoutC>{children}</PurchaseOrderLayoutC>;
}

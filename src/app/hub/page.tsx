import type { Metadata } from 'next';

import { AppLink } from '@/components/ui/app-link';

export const metadata: Metadata = {
  title: 'Hub',
};

export default function HubPage() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-full w-full absolute inset-0">
      <AppLink
        href="/hub/purchase-order"
        className="!rounded-full"
        variant="secondary"
        size="lg"
      >
        Pedido De Compra
      </AppLink>
      <AppLink
        href="/hub/automate-excel"
        className="!rounded-full"
        variant="secondary"
        size="lg"
      >
        Automatizar Excel
      </AppLink>
    </div>
  );
}

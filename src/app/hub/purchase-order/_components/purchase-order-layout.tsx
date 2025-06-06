'use client';

import { cn } from '@/utils/cn.util';
import { useStore } from '@/hooks/use-store.hook';
import { useSidebar } from '@/hooks/use-app-sidebar.hook';

import { PurchaseOrderSidebar } from './purchase-order-sidebar';

export function PurchaseOrderLayout({ children }: WithChildren) {
  const sidebar = useStore(useSidebar, (x) => x);

  if (!sidebar) return null;

  const { getOpenState, settings } = sidebar;

  return (
    <>
      <PurchaseOrderSidebar />
      <main
        className={cn(
          'transition-[margin-left] ease-in-out duration-300',
          !settings.disabled && (!getOpenState() ? 'lg:ml-[90px] w-[calc(100%-90px)]' : 'lg:ml-72 w-[calc(100%-18rem)]')
        )}
      >
        {children}
      </main>
    </>
  );
}

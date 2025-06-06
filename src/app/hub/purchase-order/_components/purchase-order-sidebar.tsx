'use client';

import { cn } from '@/utils/cn.util';
import { useStore } from '@/hooks/use-store.hook';
import { useSidebar } from '@/hooks/use-app-sidebar.hook';

import { PurchaseSidebarToggle } from './purchase-order-sidebar-toggle';
import { PurchaseOrderSidebarMenu } from './purchase-order-sidebar-menu';

export function PurchaseOrderSidebar() {
  const sidebar = useStore(useSidebar, (x) => x);

  if (!sidebar) return null;

  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;

  const openState = getOpenState();

  return (
    <aside
      className={cn(
        'fixed top-20 left-0 z-20 h-(--content-height) -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 bg-widget-bg',
        !openState ? 'w-[90px]' : 'w-72',
        settings.disabled && 'hidden'
      )}
    >
      <PurchaseSidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800"
      >
        <PurchaseOrderSidebarMenu isOpen={isOpen} />
      </div>
    </aside>
  );
}

import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getPurchaseOrderSidebarData } from '@/lib/get-purchase-order-sidebar-data.lib';
import { AppLink } from '@/components/ui/app-link';
import { LucideIcon } from '@/components/app/lucide-icon';
import { cn } from '@/utils/cn.util';
import { CustomTooltip } from '@/components/app/custom-tooltip';

interface PurchaseOrderSidebarMenuProps {
  isOpen: boolean | undefined;
}

export function PurchaseOrderSidebarMenu({
  isOpen,
}: PurchaseOrderSidebarMenuProps) {
  const pathname = usePathname();
  const menuItems = getPurchaseOrderSidebarData();

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        <ul className="flex flex-col items-start space-y-5 px-2">
          {menuItems.map((item, index) => (
            <li key={index} className="w-full">
              <CustomTooltip tooltipText={item.label}>
                <AppLink
                  href={item.href}
                  variant={pathname.includes(item.href) ? 'default' : 'ghost'}
                  className={cn('w-full justify-start !text-lg !py-5', {
                    'justify-center items-center': !isOpen,
                  })}
                  size="lg"
                >
                  <LucideIcon icon={item.icon} size="lg" />{' '}
                  {isOpen ? item.label : null}
                </AppLink>
              </CustomTooltip>
            </li>
          ))}
        </ul>
      </nav>
    </ScrollArea>
  );
}

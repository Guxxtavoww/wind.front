import { SidebarProvider } from '@/components/ui/sidebar.provider';

import { HubHeader } from './_components/hub-header';

export default function HubLayout({ children }: WithChildren) {
  return (
      <div className="relative">
        <HubHeader />
        <div className="absolute top-20 min-h-[calc(100svh-5rem)] w-screen">
          {children}
        </div>
      </div>
  );
}

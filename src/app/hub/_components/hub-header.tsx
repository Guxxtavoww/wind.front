'use client';

import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { AppLink } from '@/components/ui/app-link';
import { LucideIcon } from '@/components/app/lucide-icon';
import { ModeToggle } from '@/components/app/mode-toggle';
import { CustomTooltip } from '@/components/app/custom-tooltip';

function useHubHeader() {
  const pathname = usePathname();
  const [title, setTitle] = useState<string>();

  useEffect(() => {
    setTitle(document?.title);
  }, [pathname]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.title !== title) {
        setTitle(document?.title);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [title]);

  return title;
}

export function HubHeader() {
  const title = useHubHeader();

  return (
    <header className="w-full h-20 flex items-center justify-between bg-widget-bg px-7 fixed top-0 z-50 backdrop-blur-sm">
      <div />
      <h2 className="text-xl font-medium">{title}</h2>
      <div className="flex items-center gap-3">
        <ModeToggle />
        <CustomTooltip tooltipText="Sair">
          <AppLink href="/" variant="ghost">
            <LucideIcon icon={LogOut} />
          </AppLink>
        </CustomTooltip>
      </div>
    </header>
  );
}

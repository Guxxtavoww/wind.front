'use client';

import { useMemo } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

import { LucideIcon } from './lucide-icon';
import { CustomTooltip } from './custom-tooltip';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const isLightMode = useMemo(() => theme === 'light', [theme]);

  return (
    <CustomTooltip tooltipText="Mudar de tema">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(() => (isLightMode ? 'dark' : 'light'))}
      >
        <LucideIcon icon={isLightMode ? Sun : Moon} />
      </Button>
    </CustomTooltip>
  );
}

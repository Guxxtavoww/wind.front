import { cn } from '@/utils/cn.util';

import { type InputProps, Input } from './input';
import { type Icon, LucideIcon } from '../app/lucide-icon';

export interface InputWithIconsProps extends InputProps {
  leftIcon?: Icon;
  rightIcon?: Icon;
}

export function InputWithIcons({
  leftIcon,
  rightIcon,
  className,
  ...rest
}: InputWithIconsProps) {
  if (!leftIcon && !rightIcon) {
    throw new Error(
      'At least one icon (leftIcon or rightIcon) must be provided.'
    );
  }

  return (
    <div className="relative">
      {leftIcon && (
        <LucideIcon
          icon={leftIcon}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
      )}
      <Input
        className={cn(className, {
          'pl-10': !!leftIcon,
          'pr-10': !!rightIcon,
        })}
        {...rest}
      />
      {rightIcon && (
        <LucideIcon
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          icon={rightIcon}
        />
      )}
    </div>
  );
}

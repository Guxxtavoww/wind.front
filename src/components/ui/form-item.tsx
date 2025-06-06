'use client';

import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '@/utils/cn.util';

const FormItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('space-y-2 flex flex-col', className)} {...props} />;
  }
);
FormItem.displayName = 'FormItem';

export { FormItem };

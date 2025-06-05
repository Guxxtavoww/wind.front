import {
  forwardRef,
  type RefAttributes,
  type ForwardRefExoticComponent,
} from 'react';
import type { LucideProps } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

const lucideIconVariants = cva('transition-all select-none bg-transparent', {
  variants: {
    size: {
      default: '!h-4.5 !w-4.5',
      sm: '!h-3.5 !w-3.5',
      lg: '!h-8 !w-8',
      medium_large: '!h-10 !w-10',
      xl: '!h-12 !w-12',
      xs: '!w-2 !h-2',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export type Icon = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>;

export interface LucideIconProps
  extends VariantProps<typeof lucideIconVariants> {
  className?: string;
  icon: Icon;
}

const LucideIcon = forwardRef<SVGSVGElement, LucideIconProps>(
  ({ icon: Icon, className, size }, ref) => {
    return (
      <Icon className={lucideIconVariants({ className, size })} ref={ref} />
    );
  },
);
LucideIcon.displayName = 'Icon';

export { LucideIcon };

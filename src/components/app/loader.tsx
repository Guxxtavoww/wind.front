import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2, type LucideProps } from 'lucide-react';

const loaderVariants = cva('animate-spin bg-transparent', {
  variants: {
    size: {
      default: 'w-5 h-5', // 20px
      sm: 'w-4 h-4', // 16px
      lg: 'w-6 h-6', // 24px
      xl: 'w-8 h-8', // 32px
      icon: 'size-5',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface ILoaderProps
  extends AutoOmit<LucideProps, 'size'>,
    VariantProps<typeof loaderVariants> {}

export function Loader({ className, size, ...rest }: ILoaderProps) {
  return <Loader2 className={loaderVariants({ className, size })} {...rest} />;
}

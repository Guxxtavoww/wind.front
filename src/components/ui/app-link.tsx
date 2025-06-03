import Link from 'next/link';
import type { VariantProps } from 'class-variance-authority';
import { forwardRef, type ComponentProps, type ForwardedRef } from 'react';

import { buttonVariants } from './button';

export interface IAppLinkProps
  extends VariantProps<typeof buttonVariants>,
    ComponentProps<typeof Link> {}

const AppLink = forwardRef<HTMLAnchorElement, IAppLinkProps>(
  (
    { variant, size, className, children, style, ...rest }: IAppLinkProps,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => (
    <Link
      {...rest}
      ref={ref}
      className={buttonVariants({ className, variant, size })}
    >
      {children}
    </Link>
  )
);
AppLink.displayName = 'AppLink';

export { AppLink };

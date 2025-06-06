import {
  CircleCheckBig,
  History,
  type LucideIcon,
  Search,
  ShoppingCart,
  TriangleAlert,
} from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getPurchaseOrderSidebarData(): Group[] {
  return [
    {
      groupLabel: 'Ações de Pedidos',
      menus: [
        {
          label: 'Pedido de compra',
          icon: ShoppingCart,
          href: '/hub/purchase-order',
        },
        {
          label: 'Pesquisar Pedido',
          icon: Search,
          href: '/hub/purchase-order/search-order',
        },
        {
          label: 'Histórico',
          icon: History,
          href: '/hub/purchase-order/history',
        },
        {
          label: 'Pedidos Pendentes',
          icon: TriangleAlert,
          href: '/hub/purchase-order/pending-orders',
        },
        {
          label: 'Pedidos Finalizados',
          icon: CircleCheckBig,
          href: '/hub/purchase-order/finished-orders',
        },
      ],
    },
  ];
}

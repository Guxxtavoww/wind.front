import {
  CircleCheckBig,
  History,
  Search,
  ShoppingCart,
  TriangleAlert,
} from 'lucide-react';

export function getPurchaseOrderSidebarData() {
  return [
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
  ];
}

import type { IconName } from '../landing/Icon';

export type ManagerNavigationItem = {
  label: string;
  slug: string;
  icon: IconName;
};

export type ManagerNavigationGroup = {
  label: string;
  items: ManagerNavigationItem[];
};

export const managerNavigation: ManagerNavigationGroup[] = [
  {
    label: 'Operations',
    items: [
      { label: 'Overview', slug: '', icon: 'grid_view' },
      { label: 'Orders & Kitchen', slug: 'orders-and-kitchen', icon: 'skillet' },
      { label: 'Tables & Reservations', slug: 'tables-and-reservations', icon: 'table_restaurant' },
      { label: 'Cleaning Operations', slug: 'cleaning-operations', icon: 'cleaning_services' },
    ],
  },
  {
    label: 'Workforce & Service',
    items: [
      { label: 'Staff & Shifts', slug: 'staff-and-shifts', icon: 'badge' },
      { label: 'Guest Services', slug: 'guest-services', icon: 'support_agent' },
      { label: 'Reviews & Ratings', slug: 'reviews-and-ratings', icon: 'hotel_class' },
    ],
  },
  {
    label: 'Kitchen & Business',
    items: [
      { label: 'Menu Management', slug: 'menu-management', icon: 'menu_book' },
      { label: 'Analytics & Reports', slug: 'analytics-and-reports', icon: 'analytics' },
      { label: 'AI Assistant', slug: 'ai-assistant', icon: 'smart_toy' },
      { label: 'Notifications, Activity & Handover', slug: 'notifications-and-activity', icon: 'history' },
    ],
  },
];

export function getManagerNavigationItem(slug: string) {
  return managerNavigation.flatMap((group) => group.items).find((item) => item.slug === slug);
}

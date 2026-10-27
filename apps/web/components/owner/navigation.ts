import type { IconName } from '../landing/Icon';

export type OwnerNavigationItem = {
  label: string;
  slug: string;
  icon: IconName;
};

export type OwnerNavigationGroup = {
  label: string;
  items: OwnerNavigationItem[];
};

export const ownerNavigation: OwnerNavigationGroup[] = [
  {
    label: 'Overview',
    items: [{ label: 'Owner Dashboard', slug: '', icon: 'dashboard' }],
  },
  {
    label: 'People & Workforce',
    items: [
      { label: 'Staff Management', slug: 'staff-management', icon: 'badge' },
      { label: 'Staff Performance', slug: 'staff-performance', icon: 'trending_up' },
      { label: 'Escalations', slug: 'escalations', icon: 'priority_high' },
    ],
  },
  {
    label: 'Customer Experience',
    items: [
      { label: 'Menu Management', slug: 'menu', icon: 'menu_book' },
      { label: 'Reviews & Ratings', slug: 'reviews-ratings', icon: 'star' },
      { label: 'Restaurant Policies', slug: 'restaurant-policies', icon: 'policy' },
    ],
  },
  {
    label: 'Brand & Reputation',
    items: [{ label: 'Public Relations', slug: 'public-relations', icon: 'campaign' }],
  },
  {
    label: 'Business Intelligence',
    items: [
      { label: 'AI Assistant', slug: 'ai-assistant', icon: 'auto_awesome' },
      { label: 'Top Performers', slug: 'top-performers', icon: 'military_tech' },
      { label: 'Sales Analytics', slug: 'sales-analytics', icon: 'bar_chart' },
    ],
  },
  {
    label: 'Administration',
    items: [{ label: 'General Settings', slug: 'general-settings', icon: 'settings' }],
  },
];

export function getOwnerNavigationItem(slug: string) {
  return ownerNavigation.flatMap((group) => group.items).find((item) => item.slug === slug);
}

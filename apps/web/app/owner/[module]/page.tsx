import { notFound } from 'next/navigation';
import { OwnerDashboardShell } from '../../../components/owner/OwnerDashboardShell';
import { getOwnerNavigationItem } from '../../../components/owner/navigation';
import { StaffManagementModule } from '../../../components/owner/StaffManagementModule';
import { StaffPerformanceModule } from '../../../components/owner/StaffPerformanceModule';
import { EscalationsModule } from '../../../components/owner/EscalationsModule';
import { ReviewsRatingsModule } from '../../../components/owner/ReviewsRatingsModule';
import { RestaurantPoliciesModule } from '../../../components/owner/RestaurantPoliciesModule';
import { PublicRelationsModule } from '../../../components/owner/PublicRelationsModule';
import { AiAssistantModule } from '../../../components/owner/AiAssistantModule';
import { TopPerformersModule } from '../../../components/owner/TopPerformersModule';
import { SalesAnalyticsModule } from '../../../components/owner/SalesAnalyticsModule';
import { MenuManagementModule } from '../../../components/owner/MenuManagementModule';
import { GeneralSettingsModule } from '../../../components/owner/GeneralSettingsModule';
import { OwnerModulePlaceholder } from '../../../components/owner/OwnerModulePlaceholder';

type OwnerModulePageProps = {
  params: { module: string };
};

export default function OwnerModulePage({ params }: OwnerModulePageProps) {
  const navigationItem = getOwnerNavigationItem(params.module);

  if (!navigationItem) notFound();

  const renderModuleContent = () => {
    switch (navigationItem.slug) {
      case 'staff-management':
        return <StaffManagementModule />;
      case 'staff-performance':
        return <StaffPerformanceModule />;
      case 'escalations':
        return <EscalationsModule />;
      case 'reviews-ratings':
        return <ReviewsRatingsModule />;
      case 'restaurant-policies':
        return <RestaurantPoliciesModule />;
      case 'public-relations':
        return <PublicRelationsModule />;
      case 'ai-assistant':
        return <AiAssistantModule />;
      case 'top-performers':
        return <TopPerformersModule />;
      case 'sales-analytics':
        return <SalesAnalyticsModule />;
      case 'menu':
        return <MenuManagementModule />;
      case 'general-settings':
        return <GeneralSettingsModule />;
      default:
        return <OwnerModulePlaceholder moduleName={navigationItem.label} />;
    }
  };

  return (
    <OwnerDashboardShell activeSlug={navigationItem.slug}>
      {renderModuleContent()}
    </OwnerDashboardShell>
  );
}

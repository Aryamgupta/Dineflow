import { notFound } from 'next/navigation';
import { ManagerDashboardShell } from '../../../components/manager/ManagerDashboardShell';
import { getManagerNavigationItem } from '../../../components/manager/navigation';
import { ManagerModulePlaceholder } from '../../../components/manager/ManagerModulePlaceholder';
import { OrdersKitchenModule } from '../../../components/manager/OrdersKitchenModule';
import { TablesReservationsModule } from '../../../components/manager/TablesReservationsModule';
import { CleaningOperationsModule } from '../../../components/manager/CleaningOperationsModule';

type ManagerModulePageProps = {
  params: { module: string };
};

export default function ManagerModulePage({ params }: ManagerModulePageProps) {
  const navigationItem = getManagerNavigationItem(params.module);

  if (!navigationItem) notFound();

  return (
    <ManagerDashboardShell activeSlug={navigationItem.slug}>
      {params.module === 'orders-and-kitchen' && <OrdersKitchenModule />}
      {params.module === 'tables-and-reservations' && <TablesReservationsModule />}
      {params.module === 'cleaning-operations' && <CleaningOperationsModule />}
      {params.module !== 'orders-and-kitchen' &&
        params.module !== 'tables-and-reservations' &&
        params.module !== 'cleaning-operations' && (
          <ManagerModulePlaceholder
            moduleName={navigationItem.label}
            moduleSlug={navigationItem.slug}
          />
        )}
    </ManagerDashboardShell>
  );
}

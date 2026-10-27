import { notFound } from 'next/navigation';
import { ManagerDashboardShell } from '../../../components/manager/ManagerDashboardShell';
import { getManagerNavigationItem } from '../../../components/manager/navigation';
import { ManagerModulePlaceholder } from '../../../components/manager/ManagerModulePlaceholder';

type ManagerModulePageProps = {
  params: { module: string };
};

export default function ManagerModulePage({ params }: ManagerModulePageProps) {
  const navigationItem = getManagerNavigationItem(params.module);

  if (!navigationItem) notFound();

  return (
    <ManagerDashboardShell activeSlug={navigationItem.slug}>
      <ManagerModulePlaceholder
        moduleName={navigationItem.label}
        moduleSlug={navigationItem.slug}
      />
    </ManagerDashboardShell>
  );
}

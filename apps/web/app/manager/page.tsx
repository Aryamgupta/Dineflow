import { ManagerDashboardShell } from '../../components/manager/ManagerDashboardShell';
import { ManagerOverview } from '../../components/manager/ManagerOverview';

export default function ManagerDashboardPage() {
  return (
    <ManagerDashboardShell activeSlug="">
      <ManagerOverview />
    </ManagerDashboardShell>
  );
}

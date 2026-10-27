import { OwnerDashboardShell } from '../../components/owner/OwnerDashboardShell';
import { OwnerOverview } from '../../components/owner/OwnerOverview';

export default function OwnerDashboardPage() {
  return (
    <OwnerDashboardShell activeSlug="">
      <OwnerOverview />
    </OwnerDashboardShell>
  );
}

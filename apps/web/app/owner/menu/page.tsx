import { OwnerDashboardShell } from '../../../components/owner/OwnerDashboardShell';
import { MenuManagementModule } from '../../../components/owner/MenuManagementModule';

export default function OwnerMenuPage() {
  return (
    <OwnerDashboardShell activeSlug="menu">
      <MenuManagementModule />
    </OwnerDashboardShell>
  );
}


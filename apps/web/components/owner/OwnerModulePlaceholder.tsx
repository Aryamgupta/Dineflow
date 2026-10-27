type OwnerModulePlaceholderProps = {
  moduleName: string;
};

export function OwnerModulePlaceholder({ moduleName }: OwnerModulePlaceholderProps) {
  return (
    <section aria-label={`${moduleName} module placeholder`} className="owner-module-placeholder">
      <p className="owner-module-placeholder-label">Workspace foundation</p>
      <p>
        {moduleName} will be implemented in a later phase. This screen currently provides the shared
        owner navigation, responsive layout, and theme controls only.
      </p>
    </section>
  );
}

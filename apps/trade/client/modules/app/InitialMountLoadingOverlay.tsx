import { BrandIconLoadingIndicator } from 'client/components/BrandIconLoadingIndicator';

export function InitialMountLoadingOverlay() {
  return (
    <div className="bg-surface-card absolute inset-0 z-50 flex h-full w-full items-center justify-center">
      <BrandIconLoadingIndicator size={72} />
    </div>
  );
}

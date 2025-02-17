import Image from 'next/image';
import edgeLogo from 'client/assets/edge-logo.svg';

export function LabelWithEdgeLogo({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-x-1">
      <Image src={edgeLogo} className="h-2.5 w-auto" alt="" />
      {label}
    </div>
  );
}

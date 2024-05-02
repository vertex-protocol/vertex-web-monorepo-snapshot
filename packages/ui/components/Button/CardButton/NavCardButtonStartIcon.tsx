import { IconType } from '../../Icons';

export function NavCardButtonStartIcon({ icon: Icon }: { icon?: IconType }) {
  if (!Icon) return null;
  return (
    <div className="p-1.5">
      <Icon className="text-text-secondary" size={24} />
    </div>
  );
}

import { Button } from '../Button';
import { Icons } from '../Icons';
import { DisclosureCard, DisclosureCardProps } from './DisclosureCard';

interface Props extends DisclosureCardProps {
  onDismiss: () => void;
}

export function DisclosureDismissibleCard({
  title,
  onDismiss,
  ...rest
}: Props) {
  const titleContent = (
    <div className="flex justify-between">
      <span>{title}</span>
      <Button endIcon={<Icons.X size={14} />} onClick={onDismiss} />
    </div>
  );

  return <DisclosureCard title={titleContent} {...rest} />;
}

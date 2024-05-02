import { Icons } from '@vertex-protocol/web-ui';
import { ErrorPanel } from 'client/components/ErrorPanel';

interface Props {
  title: string;
  content: React.ReactNode;
}

export function OrderFormWarningPanel({ title, content }: Props) {
  return (
    <ErrorPanel className="bg-overlay-accent/10">
      <div className="flex flex-col gap-y-3 text-xs">
        <div className="text-text-primary flex items-center gap-x-1.5">
          <Icons.BsExclamation
            size={16}
            className="bg-overlay-accent/20 text-accent rounded-full"
          />
          {title}
        </div>
        <div className="text-text-secondary">{content}</div>
      </div>
    </ErrorPanel>
  );
}

import { Card, Divider, IconComponent } from '@vertex-protocol/web-ui';
import { ReactNode } from 'react';

interface Props {
  title: string;
  description: string;
  icon: IconComponent;
  content: ReactNode;
}

export function BlitzOpportunityCard({
  title,
  description,
  icon: Icon,
  content,
}: Props) {
  return (
    <Card className="flex flex-col gap-y-4 p-4 text-sm">
      <div className="flex items-center gap-x-5">
        <Card className="text-accent p-2">
          <Icon size={20} />
        </Card>
        <div className="flex flex-col gap-y-1.5">
          <div className="text-text-primary text-sm">{title}</div>
          <div className="text-text-tertiary text-xs">{description}</div>
        </div>
      </div>
      <Divider />
      {content}
    </Card>
  );
}

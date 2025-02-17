import {
  joinClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { Card } from '@vertex-protocol/web-ui';
import { HorizontalValueWithLabelProps } from 'client/components/ValueWithLabel/types';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';

function Container({ children, className }: WithClassnames<WithChildren>) {
  return (
    <Card className={joinClassNames('flex flex-col gap-y-5 p-3', className)}>
      {children}
    </Card>
  );
}

function Items({ children }: WithChildren) {
  return <div className="flex flex-col gap-y-2">{children}</div>;
}

function Item(props: HorizontalValueWithLabelProps) {
  return <ValueWithLabel.Horizontal sizeVariant="xs" {...props} />;
}

export const DataCard = { Container, Items, Item };

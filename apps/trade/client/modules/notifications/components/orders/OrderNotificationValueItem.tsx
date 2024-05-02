import { ReactNode } from 'react';

interface Props {
  label: string;
  value: ReactNode;
}

export function OrderNotificationValueItem({ label, value }: Props) {
  return (
    <div className="flex gap-x-3 whitespace-nowrap">
      {/*Min-width here so that the values are left-aligned (i.e. label has the same width for all occurances.
      This is a bit hacky and will require updating if the max width of the label changes*/}
      <p className="min-w-[60px]">{label}</p>
      <div className="text-text-primary">{value}</div>
    </div>
  );
}

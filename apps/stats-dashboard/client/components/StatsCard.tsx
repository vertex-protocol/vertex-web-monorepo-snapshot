import { ReactNode } from 'react';

interface Props {
  title: string;
  value: ReactNode;
}

export function StatsCard({ title, value }: Props) {
  return (
    <div className="bg-black-500 border-black-200 rounded border">
      <div className="flex flex-col gap-y-1 p-6">
        <p className="text-2xl font-semibold text-white">{value}</p>
        <p className="text-white-700 font-medium">{title}</p>
      </div>
    </div>
  );
}

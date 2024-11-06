import { CronTasksPage } from 'client/pages/CronTasksPage/CronTasksPage';
import { Metadata } from 'next';

export default function Page() {
  return <CronTasksPage />;
}

export function generateMetadata(): Metadata {
  return {
    title: `Cron Tasks`,
  };
}

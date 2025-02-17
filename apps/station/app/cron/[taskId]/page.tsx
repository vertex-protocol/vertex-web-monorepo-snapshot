import {
  CronTaskPage,
  CronTaskPageRouteParams,
} from 'client/pages/CronTaskPage/CronTaskPage';

export default async function Page({
  params,
}: {
  params: Promise<CronTaskPageRouteParams>;
}) {
  const { taskId } = await params;

  return <CronTaskPage taskId={taskId} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<CronTaskPageRouteParams>;
}) {
  const { taskId } = await params;

  return {
    title: `Cron Task ${taskId}`,
  };
}

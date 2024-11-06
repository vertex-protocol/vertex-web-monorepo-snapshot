import {
  CronTaskPage,
  CronTaskPageRouteParams,
} from 'client/pages/CronTaskPage/CronTaskPage';
import { TaskPageRouteParams } from 'client/pages/TaskPage/TaskPage';
import { Metadata } from 'next';

export default function Page({
  params: { taskId },
}: {
  params: TaskPageRouteParams;
}) {
  return <CronTaskPage taskId={taskId} />;
}

export function generateMetadata({
  params,
}: {
  params: CronTaskPageRouteParams;
}): Metadata {
  return {
    title: `Cron Task ${params.taskId}`,
  };
}

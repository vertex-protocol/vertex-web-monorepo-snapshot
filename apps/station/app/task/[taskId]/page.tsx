import { TaskPage, TaskPageRouteParams } from 'client/pages/TaskPage/TaskPage';
import { Metadata } from 'next';

export default function Page({
  params: { taskId },
}: {
  params: TaskPageRouteParams;
}) {
  return <TaskPage taskId={taskId} />;
}

export function generateMetadata({
  params,
}: {
  params: TaskPageRouteParams;
}): Metadata {
  return {
    title: `Task ${params.taskId}`,
  };
}

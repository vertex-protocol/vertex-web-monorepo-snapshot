import { TaskPage, TaskPageRouteParams } from 'client/pages/TaskPage/TaskPage';

export default async function Page({
  params,
}: {
  params: Promise<TaskPageRouteParams>;
}) {
  const { taskId } = await params;

  return <TaskPage taskId={taskId} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<TaskPageRouteParams>;
}) {
  const { taskId } = await params;

  return {
    title: `Task ${taskId}`,
  };
}

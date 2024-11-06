'use client';

import { Spinner } from '@vertex-protocol/web-ui';
import { JSONCodeEditor } from 'client/components/JSONCodeEditor';
import { NoDataStateContainer } from 'client/components/NoDataStateContainer';
import { PageSection } from 'client/components/PageSection';
import { PageTitle } from 'client/components/PageTitle';
import { useTask } from 'client/hooks/queries/useTask';
import { useTaskSignatures } from 'client/hooks/queries/useTaskSignatures';
import { TaskCard } from 'client/pages/TasksPage/TaskCard';

export interface TaskPageRouteParams {
  taskId: string;
}

export function TaskPage({ taskId: taskIdQueryParam }: TaskPageRouteParams) {
  const taskId = parseInt(taskIdQueryParam);
  const { data: taskInfo, isLoading } = useTask({ id: taskId });
  const { data: taskSignatures } = useTaskSignatures({
    id: taskId,
  });

  const content = (() => {
    if (isLoading) {
      return (
        <NoDataStateContainer>
          <Spinner size={48} />
        </NoDataStateContainer>
      );
    }
    if (taskInfo == null) {
      return (
        <NoDataStateContainer>
          Unable to load task with ID ${taskId}
        </NoDataStateContainer>
      );
    }

    return (
      <>
        <TaskCard taskInfo={taskInfo} valueSizeVariant="sm" />
        <PageSection heading="Task Info">
          <JSONCodeEditor
            value={JSON.stringify(taskInfo, null, 2)}
            readOnly
            minHeight="300px"
          />
        </PageSection>
        <PageSection heading="Task Signatures">
          <JSONCodeEditor
            value={JSON.stringify(taskSignatures ?? 'Not loaded', null, 2)}
            readOnly
            minHeight="300px"
          />
        </PageSection>
      </>
    );
  })();

  return (
    <>
      <PageTitle>Task {taskId}</PageTitle>
      {content}
    </>
  );
}

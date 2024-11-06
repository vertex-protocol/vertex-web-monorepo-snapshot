'use client';

import { Spinner } from '@vertex-protocol/web-ui';
import { JSONCodeEditor } from 'client/components/JSONCodeEditor';
import { NoDataStateContainer } from 'client/components/NoDataStateContainer';
import { PageSection } from 'client/components/PageSection';
import { PageTitle } from 'client/components/PageTitle';
import { useCronTask } from 'client/pages/CronTaskPage/useCronTask';
import { CronTaskCard } from 'client/pages/CronTasksPage/CronTaskCard';

export interface CronTaskPageRouteParams {
  taskId: string;
}

export function CronTaskPage({
  taskId: taskIdQueryParam,
}: CronTaskPageRouteParams) {
  const taskId = parseInt(taskIdQueryParam);
  const { data: cronTaskInfo, isLoading } = useCronTask({ id: taskId });

  const content = (() => {
    if (isLoading) {
      return (
        <NoDataStateContainer>
          <Spinner size={48} />{' '}
        </NoDataStateContainer>
      );
    }
    if (cronTaskInfo == null) {
      return (
        <NoDataStateContainer>
          Unable to load cron task with ID ${taskId}
        </NoDataStateContainer>
      );
    }

    return (
      <>
        <CronTaskCard cronTaskInfo={cronTaskInfo} valueSizeVariant="sm" />
        <PageSection heading="Cron Task Info">
          <JSONCodeEditor
            value={JSON.stringify(cronTaskInfo, null, 2)}
            readOnly
            minHeight="300px"
          />
        </PageSection>
      </>
    );
  })();

  return (
    <>
      <PageTitle>Cron Task {taskId}</PageTitle>
      {content}
    </>
  );
}

'use client';

import { CompactInput, SecondaryButton } from '@vertex-protocol/web-ui';
import { CardsContainer } from 'client/components/CardsContainer';
import { DataFilterSwitch } from 'client/components/DataFilterSwitch';
import { PageTitle } from 'client/components/PageTitle';
import { cronPageIsActiveFilterAtom } from 'client/consts/store';
import { useCronTasks } from 'client/hooks/queries/useCronTasks';
import { CronTaskCard } from 'client/pages/CronTasksPage/CronTaskCard';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useState } from 'react';

export function CronTasksPage() {
  const [isActive, setIsActive] = useAtom(cronPageIsActiveFilterAtom);
  const [goToIdInputValue, setGoToIdInputValue] = useState('');

  const { data, isLoading } = useCronTasks({
    active: isActive,
  });

  return (
    <>
      <div>
        <PageTitle>Cron Tasks</PageTitle>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <DataFilterSwitch
            label="Active"
            id="isActive"
            checked={isActive}
            onCheckedChange={setIsActive}
          />
          <div className="flex gap-x-2">
            <CompactInput
              placeholder="Task ID"
              type="number"
              value={goToIdInputValue}
              onChange={(e) => setGoToIdInputValue(e.target.value)}
            />
            <SecondaryButton as={Link} href={`/cron/${goToIdInputValue}`}>
              Go
            </SecondaryButton>
          </div>
        </div>
      </div>
      <CardsContainer isLoading={isLoading} isEmpty={data?.length === 0}>
        {data?.map((item) => {
          return (
            <Link href={`/cron/${item.id}`} key={item.id}>
              <CronTaskCard cronTaskInfo={item} />
            </Link>
          );
        })}
      </CardsContainer>
    </>
  );
}

'use client';

import { CompactInput, SecondaryButton } from '@vertex-protocol/web-ui';
import { CardsContainer } from 'client/components/CardsContainer';
import { DataFilterSwitch } from 'client/components/DataFilterSwitch';
import { PageTitle } from 'client/components/PageTitle';
import { Pagination } from 'client/components/Pagination';
import { tasksPageIsPendingFilterAtom } from 'client/consts/store';
import { usePaginatedTasks } from 'client/hooks/queries/usePaginatedTasks';
import { TaskCard } from 'client/pages/TasksPage/TaskCard';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function TasksPage() {
  const [isPending, setIsPending] = useAtom(tasksPageIsPendingFilterAtom);
  const [goToIdInputValue, setGoToIdInputValue] = useState('');

  const {
    data,
    isLoading: isInitialLoading,
    isFetchingNextPage,
    isFetching,
    hasNextPage: queryHasNextPage,
    fetchNextPage,
  } = usePaginatedTasks({
    pending: isPending,
    pageSize: 20,
  });
  const isLoading = isInitialLoading || isFetchingNextPage;
  const numPagesFromQuery = data?.pages.length ?? 1;

  const [pageIndex, setPageIndex] = useState(0);
  const paginationHasNextPage =
    pageIndex < numPagesFromQuery - 1 || queryHasNextPage;

  // Fetch next page when needed
  useEffect(() => {
    if (!isFetching && pageIndex >= numPagesFromQuery && queryHasNextPage) {
      fetchNextPage();
    }
  }, [
    fetchNextPage,
    queryHasNextPage,
    isFetching,
    numPagesFromQuery,
    pageIndex,
  ]);

  // Reset pagination if data updates such as the current page index is greater than the number of pages
  useEffect(() => {
    if (pageIndex >= numPagesFromQuery && !queryHasNextPage) {
      setPageIndex(numPagesFromQuery - 1);
    }
  }, [queryHasNextPage, numPagesFromQuery, pageIndex]);

  const itemsForPage = data?.pages[pageIndex]?.tasks;

  return (
    <>
      <div>
        <PageTitle>Tasks</PageTitle>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <DataFilterSwitch
            label="Pending"
            id="isPending"
            checked={isPending}
            onCheckedChange={setIsPending}
          />
          <div className="flex gap-x-2">
            <CompactInput
              placeholder="Task ID"
              type="number"
              value={goToIdInputValue}
              onChange={(e) => setGoToIdInputValue(e.target.value)}
            />
            <SecondaryButton as={Link} href={`/task/${goToIdInputValue}`}>
              Go
            </SecondaryButton>
          </div>
        </div>
      </div>
      <CardsContainer
        isLoading={isLoading}
        isEmpty={itemsForPage?.length === 0}
      >
        {itemsForPage?.map((item) => {
          return (
            <Link href={`/task/${item.task_id}`} key={item.task_id}>
              <TaskCard taskInfo={item} />
            </Link>
          );
        })}
      </CardsContainer>
      <Pagination
        className="self-center"
        hasNextPage={paginationHasNextPage}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
      />
    </>
  );
}

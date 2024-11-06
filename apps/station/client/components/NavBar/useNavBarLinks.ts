import { ROUTES } from 'client/consts/routes';
import { usePathname } from 'next/navigation';

export function useNavBarLinks(): Array<{
  route: string;
  label: string;
  isActive: boolean;
}> {
  const currentPathname = usePathname();

  return [
    {
      route: ROUTES.tasks,
      label: 'Tasks',
      isActive: currentPathname === ROUTES.tasks,
    },
    {
      route: ROUTES.cronTasks,
      label: 'Cron Tasks',
      isActive: currentPathname === ROUTES.cronTasks,
    },
  ];
}

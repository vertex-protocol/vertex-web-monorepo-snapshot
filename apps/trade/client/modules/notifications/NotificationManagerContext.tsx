import { DispatchNotificationParams } from 'client/modules/notifications/types';
import { createContext, use } from 'react';

export type NotificationManagerContextData = {
  dispatchNotification(params: DispatchNotificationParams): void;
};

export const NotificationManagerContext =
  createContext<NotificationManagerContextData>(
    {} as NotificationManagerContextData,
  );

export const useNotificationManagerContext = () =>
  use(NotificationManagerContext);

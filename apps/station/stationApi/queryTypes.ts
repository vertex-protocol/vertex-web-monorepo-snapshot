import {
  CronTaskInfo,
  TaskInfo,
  TaskSignatureInfo,
} from 'stationApi/baseTypes';

export interface QueryTasksParams {
  type: 'tasks';
  pending: boolean;
  // Seconds
  max_update_time?: string;
  limit?: number;
}

export interface QueryTasksData {
  tasks: TaskInfo[];
}

export interface QueryTaskParams {
  type: 'task_info';
  task_id: number;
}

export interface QueryTaskData {
  task: TaskInfo | null;
}

export interface QueryTaskSignaturesParams {
  type: 'task_signatures';
  task_id: number;
}

export interface QueryTaskSignaturesData {
  task_id: number;
  signatures: TaskSignatureInfo[];
}

export interface QueryCronTasksParams {
  type: 'cron_tasks';
  active: boolean;
  limit?: number;
}

export interface QueryCronTasksData {
  cron_tasks: CronTaskInfo[];
}

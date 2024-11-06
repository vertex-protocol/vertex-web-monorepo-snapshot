export type StationApiResponse<TData> =
  | {
      status: 'failure';
      error: string;
      error_code: number;
    }
  | {
      status: 'success';
      data: TData;
    };

export type TaskStatus =
  | 'pending'
  | 'executing'
  | {
      executed: unknown;
    }
  | {
      cancelled: unknown;
    }
  | {
      internal_error: string;
    };

export interface TaskInfo {
  task_id: number;
  status: TaskStatus;
  task_data: unknown;
  requires_signature: boolean;
  total_sigs_required: number;
  created_at: string;
  updated_at: string;
}

export interface TaskSignatureInfo {
  task_id: number;
  signer: string;
  signature: string;
  created_at: string;
}

export interface CronTaskInfo {
  id: number;
  name: string;
  task: unknown;
  day_of_month: number | null;
  day_of_week: number | null;
  hour: number | null;
  minute: number | null;
  end_time: string | null;
  max_run_count: number | null;
  current_run_count: number;
  active: boolean;
}

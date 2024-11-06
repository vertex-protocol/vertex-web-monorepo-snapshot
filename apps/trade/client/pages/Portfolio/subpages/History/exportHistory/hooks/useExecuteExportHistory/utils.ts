export function formatExportHistoryTimestamp(timestampMillis: number): string {
  return new Date(timestampMillis).toISOString();
}

import { IndexerMarketSnapshot } from '@vertex-protocol/client';

/**
 * Processes consecutive pairs of snapshots in the provided array using a callback function.
 *
 * @param snapshots - An array of IndexerMarketSnapshot or undefined values.
 *                    Undefined snapshots are skipped during processing.
 * @param process - A callback function that is invoked for each pair of consecutive snapshots.
 *                  It receives the current snapshot, earlier snapshot and currentTimestampMillis, earlierTimestampMillis as arguments.
 */
export function processIndexerMarketSnapshots(
  snapshots: (IndexerMarketSnapshot | undefined)[],
  process: (
    currentSnapshot: IndexerMarketSnapshot,
    earlierSnapshot: IndexerMarketSnapshot,
    currentTimestampMillis: number,
    earlierTimestampMillis: number,
  ) => void,
): void {
  snapshots.forEach((snapshot, index) => {
    // Skip undefined snapshots as they contain no data to process.
    if (!snapshot) {
      return;
    }

    // Skip the first snapshot since there's no previous snapshot to process it with.
    if (index === 0) {
      return;
    }

    // Retrieve the previous snapshot from the array.
    const prevSnapshot = snapshots[index - 1];

    // While the previous snapshot is expected to be defined, check to satisfy TypeScript type safety.
    if (!prevSnapshot) {
      return;
    }

    const previousTimestampMillis = prevSnapshot.timestamp
      .times(1000)
      .toNumber();

    const currentTimestampMillis = snapshot.timestamp.times(1000).toNumber();

    // Apply the provided callback function to the current pair of snapshots.
    process(
      prevSnapshot,
      snapshot,
      previousTimestampMillis,
      currentTimestampMillis,
    );
  });
}

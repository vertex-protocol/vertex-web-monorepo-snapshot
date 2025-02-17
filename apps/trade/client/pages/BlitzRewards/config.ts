// Current phase of blitz rewards
export const CURRENT_PHASE = 2;

// Total points per epoch
export const TOTAL_EPOCH_BLITZ_POINTS = 100_000_000;

// We add amount during the epoch when we know how much gold to distribute.
// Usually somewhere around 15 days before the next epoch starts.
// See: https://www.notion.so/vertexprotocol/Token-Points-887fa9f386cf45f6984d508ebce4c79f
export const TOTAL_BLAST_GOLD_PER_EPOCH: Record<number, number | undefined> = {
  4: undefined,
  5: 471_023,
  6: 528_900,
};

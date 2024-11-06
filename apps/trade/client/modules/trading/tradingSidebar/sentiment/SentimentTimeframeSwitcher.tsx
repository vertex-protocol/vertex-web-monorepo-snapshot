import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { TabTextButton } from '@vertex-protocol/web-ui';
import { SentimentTimeframe } from 'client/modules/trading/tradingSidebar/sentiment/types';

interface Props extends WithClassnames {
  timeframe: SentimentTimeframe;
  setTimeframe: (timeframe: SentimentTimeframe) => void;
}

export function SentimentTimeframeSwitcher({
  timeframe,
  setTimeframe,
  className,
}: Props) {
  return (
    <div className={joinClassNames('flex items-center gap-2', className)}>
      <TabTextButton
        active={timeframe === '1d'}
        onClick={() => setTimeframe('1d')}
      >
        24h
      </TabTextButton>
      <TabTextButton
        active={timeframe === '30d'}
        onClick={() => setTimeframe('30d')}
      >
        30d
      </TabTextButton>
    </div>
  );
}

import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';

interface Props extends WithClassnames {
  score: number;
}

export function SentimentLabel({ score, className }: Props) {
  // get text color and label for a given sentiment score between 0 and 100
  const scoreDisplay = (() => {
    if (score > 85) {
      return {
        textColor: 'text-positive',
        label: 'V Bullish',
      };
    }
    if (score > 60) {
      return {
        textColor: 'text-positive',
        label: 'Bullish',
      };
    }
    if (score > 40) {
      return {
        textColor: 'text-text-tertiary',
        label: 'Neutral',
      };
    }
    if (score > 15) {
      return {
        textColor: 'text-negative',
        label: 'Bearish',
      };
    }
    return {
      textColor: 'text-negative',
      label: 'V Bearish',
    };
  })();

  return (
    <span className={joinClassNames(scoreDisplay.textColor, className)}>
      {scoreDisplay.label}
    </span>
  );
}

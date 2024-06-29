import { joinClassNames } from '@vertex-protocol/web-common';
import { Divider } from '@vertex-protocol/web-ui';
import { LinkButton } from 'client/components/LinkButton';
import { useTradingCompetitionContext } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';
import { differenceInDays, formatDuration } from 'date-fns';
import Link from 'next/link';

export function TradingCompetitionSubheader() {
  const {
    config: { hasPeriods, periodLabel, participantPrizes, docsHref },
    currentPeriod,
    currentContest,
    contestIds,
  } = useTradingCompetitionContext();

  if (!currentContest) {
    return null;
  }

  const period =
    hasPeriods && currentPeriod
      ? `${currentPeriod}/${contestIds?.length}`
      : undefined;

  const numDays = differenceInDays(
    currentContest.endTimeMillis,
    currentContest.startTimeMillis,
  );

  return (
    <div
      className={joinClassNames(
        'flex flex-wrap items-center gap-x-3 gap-y-1',
        'text-text-tertiary whitespace-nowrap text-xs lg:text-sm',
      )}
    >
      {periodLabel && period && (
        <>
          <SubheaderSection label={periodLabel} value={period} />
          <Divider className="h-3" vertical />
        </>
      )}
      <SubheaderSection
        label="Duration"
        value={formatDuration({ days: numDays })}
      />
      <Divider className="h-3" vertical />
      <SubheaderSection
        label="Prizes for"
        value={`Top ${participantPrizes.length}`}
      />
      {/* Hide this divider on mobile, as the following element should be on its own line. */}
      <Divider className="hidden h-3 lg:block" vertical />
      {/*Using `basis-full` to force the link onto its own line on mobile. */}
      <div className="basis-full justify-start lg:basis-auto">
        <LinkButton
          as={Link}
          colorVariant="primary"
          href={docsHref}
          withExternalIcon
          external
        >
          View Details
        </LinkButton>
      </div>
    </div>
  );
}

function SubheaderSection({ label, value }: { label: string; value: string }) {
  return (
    <div>
      {label} <span className="text-text-primary">{value}</span>
    </div>
  );
}

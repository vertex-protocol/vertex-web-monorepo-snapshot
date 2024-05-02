import { joinClassNames } from '@vertex-protocol/web-common';
import { Button, LabelTooltip } from '@vertex-protocol/web-ui';
import { ShowHideIcon } from 'client/components/Icons/ShowHideIcon';
import { usePrivacySetting } from 'client/modules/privacy/hooks/usePrivacySetting';

export function PortfolioPrivacyToggleButton() {
  const [areAccountValuesPrivate, setAreAccountValuesPrivate] =
    usePrivacySetting('areAccountValuesPrivate');

  const hideIconMessage = areAccountValuesPrivate ? 'Show info' : 'Hide info';

  return (
    <LabelTooltip label={hideIconMessage}>
      <Button
        className={joinClassNames(
          'text-text-tertiary hover:text-text-primary flex rounded p-1',
        )}
        startIcon={
          <ShowHideIcon size={14} isHidden={areAccountValuesPrivate} />
        }
        onClick={() => setAreAccountValuesPrivate(!areAccountValuesPrivate)}
      />
    </LabelTooltip>
  );
}

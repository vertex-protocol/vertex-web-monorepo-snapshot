import { IconButton, Icons, LabelTooltip } from '@vertex-protocol/web-ui';
import { usePrivacySetting } from 'client/modules/privacy/hooks/usePrivacySetting';

export function PortfolioPrivacyToggleButton() {
  const [areAccountValuesPrivate, setAreAccountValuesPrivate] =
    usePrivacySetting('areAccountValuesPrivate');

  const hideIconMessage = areAccountValuesPrivate ? 'Show info' : 'Hide info';

  return (
    <LabelTooltip label={hideIconMessage} asChild noHelpCursor>
      <IconButton
        size="xs"
        className="text-text-tertiary bg-transparent"
        icon={areAccountValuesPrivate ? Icons.FiEyeOff : Icons.FiEye}
        onClick={() => setAreAccountValuesPrivate(!areAccountValuesPrivate)}
      />
    </LabelTooltip>
  );
}

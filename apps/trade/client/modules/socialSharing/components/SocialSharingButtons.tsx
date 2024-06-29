import { Icons, SecondaryButton } from '@vertex-protocol/web-ui';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';

interface Props {
  onTwitterClick: () => void;
  onDownloadClick: () => void;
  onCopyToClipboardClick: () => void;
  isCopied: boolean;
  disabled: boolean;
}

export function SocialSharingButtons({
  onTwitterClick,
  onDownloadClick,
  onCopyToClipboardClick,
  isCopied,
  disabled,
}: Props) {
  const { trackEvent } = useAnalyticsContext();
  const buttonClassNames = 'flex-1 py-3';
  return (
    <div className="flex gap-2">
      <SecondaryButton
        className={buttonClassNames}
        size="xs"
        onClick={() => {
          onTwitterClick();
          trackEvent({
            type: 'pnl_shared_clicked',
            data: {
              sharedMethod: 'tweet',
            },
          });
        }}
        startIcon={<Icons.BsTwitterX />}
        disabled={disabled}
      >
        Tweet
      </SecondaryButton>
      <SecondaryButton
        className={buttonClassNames}
        size="xs"
        onClick={() => {
          onDownloadClick();
          trackEvent({
            type: 'pnl_shared_clicked',
            data: {
              sharedMethod: 'download',
            },
          });
        }}
        startIcon={<Icons.FiDownload />}
        disabled={disabled}
      >
        Download
      </SecondaryButton>
      <SecondaryButton
        className={buttonClassNames}
        size="xs"
        onClick={() => {
          onCopyToClipboardClick();
          trackEvent({
            type: 'pnl_shared_clicked',
            data: {
              sharedMethod: 'copy',
            },
          });
        }}
        startIcon={<Icons.MdContentCopy />}
        disabled={disabled}
      >
        {isCopied ? 'Copied' : 'Copy'}
      </SecondaryButton>
    </div>
  );
}

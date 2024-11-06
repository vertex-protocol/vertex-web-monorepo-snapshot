import { Icons, SecondaryButton } from '@vertex-protocol/web-ui';

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
  const buttonClassNames = 'flex-1 py-3';
  return (
    <div className="flex gap-2">
      <SecondaryButton
        className={buttonClassNames}
        size="xs"
        onClick={onTwitterClick}
        startIcon={<Icons.XLogo />}
        disabled={disabled}
      >
        Tweet
      </SecondaryButton>
      <SecondaryButton
        className={buttonClassNames}
        size="xs"
        onClick={onDownloadClick}
        startIcon={<Icons.DownloadSimple />}
        disabled={disabled}
      >
        Download
      </SecondaryButton>
      <SecondaryButton
        className={buttonClassNames}
        size="xs"
        onClick={onCopyToClipboardClick}
        startIcon={<Icons.Copy />}
        disabled={disabled}
      >
        {isCopied ? 'Copied' : 'Copy'}
      </SecondaryButton>
    </div>
  );
}

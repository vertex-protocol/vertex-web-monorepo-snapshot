import { SecondaryButton } from '@vertex-protocol/web-ui';
import { Icons } from '@vertex-protocol/web-ui';

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
  const buttonClasses = 'w-full py-3';

  return (
    <div className="flex gap-2.5">
      <SecondaryButton
        className={buttonClasses}
        size="md"
        onClick={onTwitterClick}
        startIcon={<Icons.BsTwitterX />}
        disabled={disabled}
      >
        Tweet
      </SecondaryButton>
      <SecondaryButton
        className={buttonClasses}
        size="md"
        onClick={onDownloadClick}
        startIcon={<Icons.FiDownload />}
        disabled={disabled}
      >
        Download
      </SecondaryButton>
      <SecondaryButton
        className={buttonClasses}
        size="md"
        onClick={onCopyToClipboardClick}
        startIcon={<Icons.MdContentCopy />}
        disabled={disabled}
      >
        {isCopied ? 'Copied' : 'Copy'}
      </SecondaryButton>
    </div>
  );
}

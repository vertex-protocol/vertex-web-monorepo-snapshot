import { Icons, TextButton, TextButtonProps } from '@vertex-protocol/web-ui';

type Props = TextButtonProps & {
  isPrivate: boolean;
  iconSize?: number;
};

export function PrivacyToggleButton({
  iconSize = 14,
  isPrivate,
  ...rest
}: Props) {
  const Icon = isPrivate ? Icons.EyeSlash : Icons.Eye;

  return (
    <TextButton {...rest}>
      <Icon size={iconSize} />
    </TextButton>
  );
}

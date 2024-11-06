import { GradientButton } from 'client/components/Button/GradientButton';
import { EXTERNAL_LINKS } from 'client/consts';
import Link from 'next/link';

export function LaunchAppButton() {
  return (
    <GradientButton
      className="px-3 py-1.5 text-sm"
      as={Link}
      href={EXTERNAL_LINKS.app}
      title="Launch App"
      external
    >
      Launch App
    </GradientButton>
  );
}

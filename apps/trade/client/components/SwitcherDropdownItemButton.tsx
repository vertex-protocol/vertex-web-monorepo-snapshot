import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DropdownUi, DropdownUiItemProps } from '@vertex-protocol/web-ui';
import { StatusIndicator } from 'client/components/StatusIndicator';

type Props = DropdownUiItemProps & {
  label: string;
  sublabel?: string;
};

export function SwitcherDropdownItemButton({
  label,
  active,
  sublabel,
  ...rest
}: Props) {
  return (
    <DropdownMenu.Item asChild>
      <DropdownUi.Item
        endIcon={
          active && <StatusIndicator sizeVariant="sm" colorVariant="positive" />
        }
        {...rest}
      >
        {/* Extra container need to stack content and not interfere with icons */}
        <div className="flex flex-1 flex-col overflow-hidden text-left">
          <div className="text-text-primary truncate text-sm">{label}</div>
          <div className="text-text-tertiary truncate empty:hidden">
            {sublabel}
          </div>
        </div>
      </DropdownUi.Item>
    </DropdownMenu.Item>
  );
}

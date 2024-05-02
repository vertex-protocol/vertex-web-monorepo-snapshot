import { WithChildren, joinClassNames } from '@vertex-protocol/web-common';
import { Button, Icons } from '@vertex-protocol/web-ui';
import { marketTradesExpandedStateAtom } from 'client/store/trading/commonTradingStore';
import { useAtom } from 'jotai';

export function ExpandCollapseButtonGroup() {
  const { disabledDown, disabledUp, onUpClick, onDownClick } =
    useExpandCollapseButtonGroup();

  return (
    <div className="border-overlay-divider/5 bg-surface-2 divide-overlay-divider/10 hidden h-max items-center divide-x rounded border sm:flex">
      <ExpandCollapseButton onClick={onUpClick} disabled={disabledUp}>
        <Icons.FiChevronUp size={14} />
      </ExpandCollapseButton>
      <ExpandCollapseButton onClick={onDownClick} disabled={disabledDown}>
        <Icons.FiChevronDown size={14} />
      </ExpandCollapseButton>
    </div>
  );
}

interface ExpandCollapseButtonProps extends WithChildren {
  disabled: boolean;
  onClick: () => void;
}

function ExpandCollapseButton({
  disabled,
  onClick,
  children,
}: ExpandCollapseButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={joinClassNames(
        !disabled && 'hover:text-text-primary',
        'text-text-tertiary px-1',
      )}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

function useExpandCollapseButtonGroup() {
  const [marketTradesExpandedState, setMarketTradesExpandedState] = useAtom(
    marketTradesExpandedStateAtom,
  );

  const onUpClick = () => {
    setMarketTradesExpandedState((prev) =>
      prev === 'collapsed' ? 'default' : 'full',
    );
  };

  const onDownClick = () => {
    setMarketTradesExpandedState((prev) =>
      prev === 'full' ? 'default' : 'collapsed',
    );
  };

  return {
    onUpClick,
    onDownClick,
    disabledUp: marketTradesExpandedState === 'full',
    disabledDown: marketTradesExpandedState === 'collapsed',
  };
}

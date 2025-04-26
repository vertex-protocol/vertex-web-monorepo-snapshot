import { CheckedState } from '@radix-ui/react-checkbox';
import { joinClassNames } from '@vertex-protocol/web-common';
import {
  Checkbox,
  DiscList,
  DisclosureCard,
  LinkButton,
  PrimaryButton,
} from '@vertex-protocol/web-ui';
import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';
import { LINKS } from 'common/brandMetadata/links/links';
import Link from 'next/link';
import { useState } from 'react';

const OVERLAY_Z_INDEX = 'z-10';

export function SpotLeverageOnDisclosure() {
  const [checked, setChecked] = useState(false);
  const { dismiss: dismissLeverageDisclosure } = useShowUserDisclosure(
    'spot_leverage_on_risk',
  );

  const onCheckedChange = (state: CheckedState) => {
    setChecked(!!state);
  };

  return (
    // This div is required to block interaction with the parent form
    <div className="absolute inset-0">
      {/* Overlay */}
      <div
        className={joinClassNames(
          'absolute inset-0',
          'cursor-not-allowed backdrop-blur-xs',
          // This needs a slight z-index adjustment to be above all
          // the elements in the form
          OVERLAY_Z_INDEX,
        )}
      />
      <div
        className={joinClassNames(
          'bg-surface-card',
          'absolute flex flex-col',
          'gap-y-4 p-3 pt-0',
          // Though further down the tree, this needs a higher z-index
          // to be above the overlay since it has been adjusted
          OVERLAY_Z_INDEX,
        )}
      >
        <DisclosureCard
          title="Turning Margin ON"
          description={
            <div className="flex flex-col gap-y-2.5">
              <p>
                Margin spot lets you auto-borrow assets, against your margin, to
                buy or sell more than you have. Borrowing increases risk. Check
                the box to continue.
              </p>
              <DiscList.Container>
                <DiscList.Item>
                  <LinkButton
                    as={Link}
                    colorVariant="primary"
                    href={LINKS.spotTradingLearnMore}
                    external
                  >
                    Learn More
                  </LinkButton>
                </DiscList.Item>
                <DiscList.Item>
                  <LinkButton
                    as={Link}
                    colorVariant="primary"
                    href={LINKS.termsOfUse}
                    external
                  >
                    Understand the Risks
                  </LinkButton>
                </DiscList.Item>
              </DiscList.Container>
            </div>
          }
        />
        <div className="text-text-secondary flex flex-col gap-y-2.5 text-xs">
          <div className="flex items-center gap-x-2">
            <Checkbox.Row>
              <Checkbox.Check
                id="spot-leverage-disclaimer"
                checked={checked}
                onCheckedChange={onCheckedChange}
                sizeVariant="xs"
              />
              <Checkbox.Label id="spot-leverage-disclaimer" sizeVariant="xs">
                I understand the risks
              </Checkbox.Label>
            </Checkbox.Row>
          </div>
          <PrimaryButton
            disabled={!checked}
            onClick={dismissLeverageDisclosure}
          >
            Continue
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

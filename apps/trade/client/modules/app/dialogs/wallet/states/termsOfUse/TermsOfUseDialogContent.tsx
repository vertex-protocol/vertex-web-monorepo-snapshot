import {
  DiscList,
  LinkButton,
  PrimaryButton,
  ScrollShadowsContainer,
} from '@vertex-protocol/web-ui';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { UseConnectWalletStateMachine } from 'client/modules/app/dialogs/wallet/hooks/useConnectWalletStateMachine';
import { LINKS } from 'common/brandMetadata/links/links';
import { clientEnv } from 'common/environment/clientEnv';
import Link from 'next/link';

interface Props {
  stateMachine: UseConnectWalletStateMachine;
}

const brandName = clientEnv.brandMetadata.displayName;

const TERMS_OF_USE_CONTENT = [
  `You are not accessing ${brandName} from a Restricted Territory as set forth in the Terms of Use.`,
  'You are not a person or entity who is a resident of, or is located, incorporated or has a registered agent, in the United States of America or a Restricted Territory.',
  `You will not in the future access ${brandName} or otherwise trade on ${brandName} while located within the United States of America or a Restricted Territory.`,
  `You are not using, and will not in the future use, a VPN to disguise your location so that you can access ${brandName} from the United States of America or a Restricted Territory.`,
  `You are lawfully permitted to access and trade on ${brandName} under the laws of jurisdiction where you are a citizen, reside and are located.`,
  `If you have accessed ${brandName} from the United Kingdom you will not trade or attempt to trade perpetual contracts.`,
  'You have read Section 10 of the Terms of Use and understand the risks associated with investing in digital assets and the specific risks associated with trading perpetual contracts and investing with borrowed funds.',
];

export function TermsOfUseDialogContent({ stateMachine }: Props) {
  return (
    <>
      <BaseAppDialog.Title onClose={stateMachine.hideDialog}>
        Terms of Use
      </BaseAppDialog.Title>
      <BaseAppDialog.Body>
        <p>
          By clicking this button, you agree to our{' '}
          <LinkButton
            external
            as={Link}
            colorVariant="accent"
            href={LINKS.termsOfUse}
          >
            Terms of Use
          </LinkButton>{' '}
          and{' '}
          <LinkButton
            external
            as={Link}
            colorVariant="accent"
            href={LINKS.privacyPolicy}
          >
            Privacy Policy
          </LinkButton>
          .
        </p>
        <div className="flex flex-col gap-y-3">
          <p>You hereby agree and warrant that:</p>
          <ScrollShadowsContainer className="text-text-tertiary bg-surface-1 flex max-h-56 rounded p-4">
            <DiscList.Container className="h-max text-xs">
              {TERMS_OF_USE_CONTENT.map((name) => {
                return <DiscList.Item key={name}>{name}</DiscList.Item>;
              })}
            </DiscList.Container>
          </ScrollShadowsContainer>
        </div>
        <PrimaryButton onClick={stateMachine.termsOfUseAgreeClicked}>
          Agree to Terms
        </PrimaryButton>
      </BaseAppDialog.Body>
    </>
  );
}

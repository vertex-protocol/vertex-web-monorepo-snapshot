import { darkTheme, FunkitConfig } from '@funkit/connect';
import { ChainEnv } from '@vertex-protocol/client';
import { getTradeAppColorVar } from 'client/modules/theme/colorVars';
import { clientEnv } from 'common/environment/clientEnv';
import Image from 'next/image';

export const FUNKIT_CONFIG: FunkitConfig = {
  appName: clientEnv.brandMetadata.displayName,
  apiKey: clientEnv.integrations.funkitApiKey,
  uiCustomizations: {
    confirmationScreen: {
      showTokenAmount: false,
      destinationConfig: {
        icon: (
          <Image
            width={15}
            height={15}
            src="https://app.vertexprotocol.com/vertex-icon.svg"
            alt="Vertex Icon"
          />
        ),
        text: 'Vertex Account',
        url: 'https://app.vertexprotocol.com/portfolio/overview',
      },
    },
  },
  textCustomizations: {
    sourceMethodTitle: 'Sources',
    confirmationScreen: {
      payAmountLabel: 'You send',
      receiveAmountLabel: 'You receive',
    },
  },
  loginConfig: {
    web2: true,
    web3: true,
  },
};

export const FUNKIT_THEME = darkTheme({
  customFontFamily: 'inherit',
  overlayBlur: 'tiny',
  customColors: {
    buttonBackground: getTradeAppColorVar('primary'),
    buttonBackgroundHover: '#886DF3',
    buttonBackgroundDisabled: 'rgba(128, 98, 241, 0.65)',
    buttonTextPrimary: getTradeAppColorVar('text-primary'),
    inputAmountQuickOptionBaseBackground: getTradeAppColorVar('surface-2'),
    inputAmountQuickOptionHoverBackground: '#32323E',
    inputAmountQuickOptionDisabledBackground: getTradeAppColorVar('surface-2'),
    inputAmountQuickOptionFocusedBorder: '#525252',
    modalBackground: getTradeAppColorVar('surface-card'),
    primaryText: getTradeAppColorVar('text-primary'),
    secondaryText: getTradeAppColorVar('text-tertiary'),
    focusedOptionBorder: '#7A6AEA',
    offBackground: getTradeAppColorVar('surface-2'),
    offBackgroundComplimentary: '#363642',
    buttonIconBackgroundHover: getTradeAppColorVar('surface-2'),
    buttonTextDisabled: 'rgba(255, 255, 255, 0.8)',
    modalBorder: 'transparent',
    modalBackdrop:
      'linear-gradient(rgba(30, 30, 40, .8), rgba(51, 51, 66, .8))',
    youPayYouReceiveBackground: getTradeAppColorVar('surface-2'),
    youPayYouReceiveBorder: getTradeAppColorVar('surface-2'),
    youPayYouReceivePrimaryText: getTradeAppColorVar('text-primary'),
    youPayYouReceiveSecondaryText: getTradeAppColorVar('text-tertiary'),
  },
  customFontSizings: {
    '10': {
      fontSize: '12px',
      lineHeight: '16px',
    },
    '12': {
      fontSize: '14px',
      lineHeight: '20px',
    },
  },
  customBorderRadiuses: {
    modalActionButton: '4px',
    modalActionButtonMobile: '4px',
    actionButton: '4px',
    modal: '12px',
    connectButton: '4px',
  },
});

// All enabled chains are currently supported by `BRIDGE_MAINNET_CHAINS`, but we may need to update the supported chains in the future if these diverge
export const FUNKIT_DEPOSIT_CHAIN_ENVS: ChainEnv[] = ['arbitrum', 'base'];

import { Icons } from '@vertex-protocol/web-ui';
import { getTradeAppColorVar } from 'client/modules/theme/colorVars';

export const ACTION_TOAST_ICONS_BY_VARIANT = {
  success: Icons.CheckCircle,
  failure: Icons.Prohibit,
  pending: Icons.ClockClockwise,
};

export const ACTION_TOAST_ICON_FILL_BY_VARIANT = {
  success: getTradeAppColorVar('positive'),
  failure: getTradeAppColorVar('negative'),
  pending: getTradeAppColorVar('accent'),
};

export const ACTION_TOAST_LEFT_SECTION_WIDTH = 'w-32';

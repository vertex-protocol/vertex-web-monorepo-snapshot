import { Icons } from '@vertex-protocol/web-ui';
import { COLORS } from 'common/theme/colors';

export const ACTION_TOAST_ICONS_BY_VARIANT = {
  success: Icons.CheckCircle,
  failure: Icons.Prohibit,
  pending: Icons.ClockClockwise,
};

export const ACTION_TOAST_ICON_FILL_BY_VARIANT = {
  success: COLORS.positive.DEFAULT,
  failure: COLORS.negative.DEFAULT,
  pending: COLORS.accent.DEFAULT,
};

export const ACTION_TOAST_LEFT_SECTION_WIDTH = 'w-32';

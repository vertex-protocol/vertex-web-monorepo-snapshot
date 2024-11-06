export enum TimeFormatSpecifier {
  /** Ex: Mon, Oct 15 */
  E_D_MMM = 'E, MMM d',
  /** Ex: Mon, Oct 15, 1:00 PM */
  E_MMM_D_HH_12H = 'E, MMM d, p',
  /** Ex: Oct 15, 1:00 PM (GMT-8) - Used for cases where the exact time is important */
  MMM_D_HH_12H_O = 'MMM d, p (O)',
  /** Ex: 08:30:12 */
  HH_MM_SS = 'HH:mm:ss',
  /** Ex: 45:20 */
  MM_SS = 'mm:ss',
  /** Ex: 10:05:12 PM */
  HH_MM_SS_12H = 'pp',
  /** Ex: 10:05 PM */
  HH_MM_12H = 'p',
  /** Ex: Oct 15 */
  MONTH_D = 'MMM d',
  /** Ex: Oct 15, 2023 */
  MONTH_D_YYYY = 'MMM d, yyyy',
  /** Ex: Oct 2023 */
  MONTH_YYYY = 'MMM yyyy',
  /** Ex: GMT-8 */
  O = 'O',
}

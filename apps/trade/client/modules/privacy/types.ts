export interface PrivacySettings {
  areAccountValuesPrivate: boolean;
  isAddressPrivate: boolean;
}

export type PrivacySettingKey = keyof PrivacySettings;

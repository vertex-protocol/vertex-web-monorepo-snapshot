import { StaticImageData } from 'next/image';

export interface TradingFeature {
  id: number;
  title: string;
  content: string;
  image: StaticImageData;
  mobileImage: StaticImageData;
}

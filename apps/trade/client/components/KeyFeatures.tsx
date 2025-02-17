import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';
import {
  IconComponent,
  Icons,
  imageToIconComponent,
} from '@vertex-protocol/web-ui';
import { useIsEnabledForBrand } from 'client/modules/envSpecificContent/hooks/useIsEnabledForBrand';
import { IMAGES } from 'common/brandMetadata/images';

const BrandMonochromeIcon = imageToIconComponent({
  src: IMAGES.brandMonochromeIcon,
  alt: '',
});

export function KeyFeatures({ className }: WithClassnames) {
  const showVertexIncentives = useIsEnabledForBrand(['vertex']);
  const showBlitzIncentives = useIsEnabledForBrand(['blitz']);

  const keyFeatures = [
    ...(showVertexIncentives
      ? [
          {
            icon: BrandMonochromeIcon,
            description: 'VRTX Incentives',
          },
        ]
      : []),
    ...(showBlitzIncentives
      ? [
          {
            icon: BrandMonochromeIcon,
            description: 'Blitz & Blast incentives',
          },
        ]
      : []),
    {
      icon: Icons.LightningFill,
      description: 'Fast and deep liquidity',
    },
    {
      icon: Icons.Plus,
      description: 'All collateral earns interest',
    },
    {
      icon: Icons.CurrencyCircleDollar,
      description: 'Unbeatable fees: 0-0.02%',
    },
  ];

  return (
    <div className={mergeClassNames('grid gap-4 sm:grid-cols-2', className)}>
      {keyFeatures.map(({ icon, description }, index) => (
        <Feature key={index} description={description} icon={icon} />
      ))}
    </div>
  );
}

function Feature({
  icon: Icon,
  description,
}: {
  icon: IconComponent;
  description: string;
}) {
  return (
    <div className="text-text-secondary flex items-center gap-x-2">
      <div className="bg-surface-2 rounded p-1">
        <Icon size={16} />
      </div>
      <span>{description}</span>
    </div>
  );
}

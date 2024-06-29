import { Icons, IconType, imageToIconComponent } from '@vertex-protocol/web-ui';
import { IMAGES } from 'common/brandMetadata/images';
import { useIsEnabledForBrand } from 'client/modules/envSpecificContent/hooks/useIsEnabledForBrand';

const BrandMonochromeIcon = imageToIconComponent({
  src: IMAGES.brandMonochromeIcon,
  alt: '',
});

export function KeyFeatures() {
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
      icon: Icons.HiLightningBolt,
      description: 'Fast and deep liquidity',
    },
    {
      icon: Icons.BiPlus,
      description: 'All collateral earns interest',
    },
    {
      icon: Icons.AiOutlineDollarCircle,
      description: 'Unbeatable fees: 0-0.02%',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {keyFeatures.map(({ icon, description }, index) => (
        <Feature key={index} description={description} icon={icon} />
      ))}
    </div>
  );
}

function Feature({
  icon,
  description,
}: {
  icon: IconType;
  description: string;
}) {
  const Icon = icon;

  return (
    <div className="text-text-secondary flex items-center gap-x-2 text-sm">
      <div className="bg-surface-2 rounded p-1">
        <Icon size={16} />
      </div>
      <span>{description}</span>
    </div>
  );
}

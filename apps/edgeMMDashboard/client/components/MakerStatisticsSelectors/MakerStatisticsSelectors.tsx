import { ChainEnvSelect } from 'client/components/MakerStatisticsSelectors/ChainEnvSelect';
import { EpochSelect } from 'client/components/MakerStatisticsSelectors/EpochSelect';
import { IntervalSelect } from 'client/components/MakerStatisticsSelectors/IntervalSelect';
import { ProductSelect } from 'client/components/MakerStatisticsSelectors/ProductSelect';
import { UseMakerStatisticsSelectors } from 'client/components/MakerStatisticsSelectors/useMakerStatisticsSelectors';

interface Props extends UseMakerStatisticsSelectors {}

export function MakerStatisticsSelectors({
  setPrimaryChainEnv,
  primaryChainEnv,
  productOptions,
  productId,
  setProductId,
  chainEnvOptions,
  epochOptions,
  epoch,
  setEpoch,
  intervalOptions,
  interval,
  setInterval,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <ChainEnvSelect
        chainEnvOptions={chainEnvOptions}
        primaryChainEnv={primaryChainEnv}
        setPrimaryChainEnv={setPrimaryChainEnv}
      />
      <ProductSelect
        productOptions={productOptions}
        productId={productId}
        setProductId={setProductId}
      />
      <EpochSelect
        epochOptions={epochOptions}
        epoch={epoch}
        setEpoch={setEpoch}
      />
      <IntervalSelect
        intervalOptions={intervalOptions}
        interval={interval}
        setInterval={setInterval}
      />
    </div>
  );
}

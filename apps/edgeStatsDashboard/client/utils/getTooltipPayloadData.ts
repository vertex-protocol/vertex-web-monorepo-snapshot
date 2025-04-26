import { first } from 'lodash';
import {
  NameType,
  ValueType,
  Payload,
} from 'recharts/types/component/DefaultTooltipContent';

export function getTooltipPayloadData<TChartDataItem>(
  payload: Payload<ValueType, NameType>[] | undefined,
) {
  // Payload is an array of displayed data points, each datapoint has a nested `payload` property of type TChartDataItem.
  const originalDataPayload: TChartDataItem | undefined =
    first(payload)?.payload;

  return originalDataPayload;
}

import { TimespanOption } from 'client/modules/selects/hooks/useTimespanSelect';
import { atom } from 'jotai';

export const timespanAtom = atom<TimespanOption>({
  id: '30d',
  value: 31,
});

import { keyBy } from 'lodash';
import avatar_1 from './assets/avatar_1.png';
import avatar_2 from './assets/avatar_2.png';
import avatar_3 from './assets/avatar_3.png';
import avatar_4 from './assets/avatar_4.png';
import avatar_5 from './assets/avatar_5.png';
import avatar_6 from './assets/avatar_6.png';
import avatar_7 from './assets/avatar_7.png';
import avatar_8 from './assets/avatar_8.png';
import avatar_9 from './assets/avatar_9.png';
import avatar_10 from './assets/avatar_10.png';
import avatar_11 from './assets/avatar_11.png';
import avatar_12 from './assets/avatar_12.png';
import avatar_13 from './assets/avatar_13.png';
import avatar_14 from './assets/avatar_14.png';

export const LIBRARY_AVATARS = [
  {
    id: 'avatar_1',
    src: avatar_1,
  },
  {
    id: 'avatar_2',
    src: avatar_2,
  },
  {
    id: 'avatar_3',
    src: avatar_3,
  },
  {
    id: 'avatar_4',
    src: avatar_4,
  },
  {
    id: 'avatar_5',
    src: avatar_5,
  },
  {
    id: 'avatar_6',
    src: avatar_6,
  },
  {
    id: 'avatar_7',
    src: avatar_7,
  },
  {
    id: 'avatar_8',
    src: avatar_8,
  },
  {
    id: 'avatar_9',
    src: avatar_9,
  },
  {
    id: 'avatar_10',
    src: avatar_10,
  },
  {
    id: 'avatar_11',
    src: avatar_11,
  },
  {
    id: 'avatar_12',
    src: avatar_12,
  },
  {
    id: 'avatar_13',
    src: avatar_13,
  },
  {
    id: 'avatar_14',
    src: avatar_14,
  },
] as const;

export const LIBRARY_AVATAR_SRC_BY_ID = keyBy(LIBRARY_AVATARS, 'id');

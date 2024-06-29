import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { getUniqueImageForValue } from 'client/utils/getUniqueImageForValue';
import Image from 'next/image';

interface Props extends WithClassnames {
  size: number;
  identifier: string | undefined;
}

/**
 * Generates a unique image for a given value (identifier)
 * @param size
 * @param identifier
 * @returns
 */
export function IdentityIcon({ size, identifier, className }: Props) {
  return (
    <Image
      className={joinClassNames('rounded-full', className)}
      src={`data:image/svg+xml;base64,${getUniqueImageForValue(identifier)}`}
      width={size}
      height={size}
      alt=""
    />
  );
}

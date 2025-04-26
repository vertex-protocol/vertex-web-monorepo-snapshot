import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { getUniqueImageForValue } from 'client/utils/getUniqueImageForValue';
import Image from 'next/image';
import { useMemo } from 'react';

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
  const imageData = useMemo(() => {
    return getUniqueImageForValue(identifier);
  }, [identifier]);

  return (
    <Image
      className={joinClassNames('rounded-full', className)}
      src={`data:image/svg+xml;base64,${imageData}`}
      width={size}
      height={size}
      alt=""
    />
  );
}

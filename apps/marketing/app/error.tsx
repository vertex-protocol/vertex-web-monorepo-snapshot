'use client';

import { ErrorIcon } from 'client/icons/ErrorIcon';
import { ErrorSection } from 'client/sections/ErrorSection/ErrorSection';
import { Metadata } from 'next';

export default function Error() {
  return <ErrorSection icon={<ErrorIcon />} label="Server Error" />;
}

export const metadata: Metadata = {
  title: 'Server Error',
};

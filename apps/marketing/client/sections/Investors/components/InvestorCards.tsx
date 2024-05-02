import Image from 'next/image';
import React from 'react';

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid w-full grid-cols-2 items-center justify-center gap-2 sm:grid-cols-3 md:grid-cols-4">
      {children}
    </div>
  );
}

function Card({ imageSrc, name }: { name: string; imageSrc: string }) {
  return (
    <div className="bg-black-600/50 relative flex h-32 items-center justify-center overflow-hidden rounded-lg">
      <Image className="h-auto w-2/3" src={imageSrc} alt={name} />
    </div>
  );
}

export const InvestorCards = {
  Container,
  Card,
};

'use client';

import { HomePageButton } from 'client/components/Button/HomePageButton';
import Image from 'next/image';

import logo from 'assets/logo-light.svg';

export function NavLogoButton() {
  return (
    <HomePageButton
      onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
      className="flex items-center justify-center"
    >
      <Image src={logo} alt="Vertex" className="-mt-0.5 h-auto w-20 lg:w-28" />
    </HomePageButton>
  );
}

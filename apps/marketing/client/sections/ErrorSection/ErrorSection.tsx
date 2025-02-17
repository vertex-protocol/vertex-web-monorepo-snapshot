import { MotionButton } from 'client/components/Button/MotionButton';
import { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  label: string;
}

export const ErrorSection = ({ icon, label }: Props) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center pt-24 text-center">
      <div className="animate-fade-in relative mb-8 w-[50vw] max-w-[866px]">
        {icon}
      </div>
      <p className="text-body-white text-lg lg:text-3xl">{label}</p>
      <MotionButton
        href="/"
        className="bg-primary hover:bg-primary/90 mt-8 rounded-lg px-6 py-3 text-white"
      >
        Home
      </MotionButton>
    </div>
  );
};

interface Props {
  stepNumber: number;
  heading: string;
  subheading: string;
}

export function AddSubaccountDialogStepHeader({
  stepNumber,
  heading,
  subheading,
}: Props) {
  return (
    <div className="text-text-primary flex flex-col gap-y-1 text-xs">
      <div>
        <p>Step {stepNumber}</p>
        <p className="text-base">{heading}</p>
      </div>
      <p className="text-text-tertiary">{subheading}</p>
    </div>
  );
}

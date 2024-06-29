type ButtonOnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => void;

export function getTableButtonOnClickHandler(handler: ButtonOnClickHandler) {
  return (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    handler(e);
  };
}

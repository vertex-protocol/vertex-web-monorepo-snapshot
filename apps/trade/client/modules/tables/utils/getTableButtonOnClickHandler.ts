import { MouseEvent } from 'react';

type ButtonOnClickHandler = (e: MouseEvent<HTMLButtonElement>) => void;

export function getTableButtonOnClickHandler(handler: ButtonOnClickHandler) {
  return (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    handler(e);
  };
}

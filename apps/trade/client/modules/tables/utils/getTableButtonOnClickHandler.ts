import { MouseEvent } from 'react';

type ButtonOnClickHandler = (e: MouseEvent) => void;

export function getTableButtonOnClickHandler(handler: ButtonOnClickHandler) {
  return (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    handler(e);
  };
}

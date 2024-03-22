import { MouseEventHandler, ReactNode } from "react";

interface IButton {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ children, onClick }: IButton) => {
  return (
    <button
      className="bg-blue-600 w-fit h-10 rounded-md hover:bg-blue-500 active:bg-blue-700 px-2"
      onClick={(event) => onClick(event)}
    >
      {children}
    </button>
  );
};

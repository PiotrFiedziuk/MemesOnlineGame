interface IModal {
  isVisible: boolean;
  text: string;
}

export const Modal = ({ isVisible, text }: IModal) => {
  if (!isVisible) return null;

  return (
    <>
      <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 h-1/3 border-2 border-black rounded-md flex items-center justify-center z-20 bg-white">
        <span>{text}</span>
      </div>
      <div className="absolute w-screen h-screen opacity-50 bg-white z-10"></div>
    </>
  );
};

interface IInput {
  value: string;
  onChange: (value: string) => void;
}

export const Input = ({ value, onChange }: IInput) => {
  return (
    <input
      className=" w-44 h-10 border-2 rounded-md border-black hover:border-blue-600 outline-0 transition-colors duration-100 px-2"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

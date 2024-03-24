interface IChatInput {
  value: string;
  onChange: (value: string) => void;
}

export const ChatInput = ({ value, onChange }: IChatInput) => {
  return (
    <input
      className="w-96 border-2 border-black outline-0 px-2"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

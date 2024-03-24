import { useGameDataStore } from "../stores/useGameDataStore.ts";

export const PromptCard = () => {
  const promptCard = useGameDataStore((state) => state.promptCard);

  return (
    <div className="w-56 h-80 bg-black border-2 border-black rounded-md">
      <span className="text-white">{promptCard}</span>
    </div>
  );
};

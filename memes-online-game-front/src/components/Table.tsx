import { PromptCard } from "./PromptCard.tsx";
import { SelectedCards } from "./SelectedCards.tsx";

export const Table = () => {
  return (
    <div className="h-3/5 w-full flex items-center px-16 justify-between">
      <PromptCard />
      <SelectedCards />
    </div>
  );
};

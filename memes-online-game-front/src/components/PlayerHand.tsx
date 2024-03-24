import { PlayerCard } from "./PlayerCard.tsx";

interface IPlayerHand {
  username: string;
  cardsCount: number;
}

export const PlayerHand = ({ cardsCount, username }: IPlayerHand) => {
  const cards = Array(cardsCount).fill(username);

  return (
    <div className="flex w-1/3 flex-col h-full">
      <div className="flex items-center justify-center">
        <span>{username}</span>
      </div>
      <div className="h-full flex gap-2 p-4">
        {cards.map((_, index) => (
          <PlayerCard key={`${username}-${index}`} username={username} />
        ))}
      </div>
    </div>
  );
};

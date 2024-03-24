import { useGameDataStore } from "../stores/useGameDataStore.ts";

export const Scoreboard = () => {
  const scoreboard = useGameDataStore((state) => state.scoreboard);

  return (
    <div className="min-w-40 w-fit h-full bottom-0 right-0 border-t-2 border-l-2 border-black rounded-tl-md">
      <div className="bg-blue-400 w-full h-1/7 border-b-2 border-b-black flex justify-center items-center rounded-tl-sm">
        <span>Scoreboard</span>
      </div>
      <div className="px-2 pt-2">
        {Object.entries(scoreboard).map(([username, points]) => (
          <div key={username}>
            <span>{`${username}: ${points}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

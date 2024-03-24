interface IPlayerCard {
  username: string;
}

export const PlayerCard = ({ username }: IPlayerCard) => {
  return (
    <div className="w-36 h-full bg-blue-400 border-2 border-black rounded-md flex items-center justify-center p-4">
      <span>{username}</span>
    </div>
  );
};

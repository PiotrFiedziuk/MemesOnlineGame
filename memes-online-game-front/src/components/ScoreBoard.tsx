interface IScoreBoard {
  users: { username: string; points: number }[];
}

export const ScoreBoard = ({ users }: IScoreBoard) => {
  return (
    <div className="absolute min-w-1/3 w-fit h-1/4 bottom-0 right-0 border-t-2 border-l-2 border-black rounded-tl-md">
      <div className="bg-blue-400 w-full h-1/5 border-b-2 border-b-black flex justify-center items-center rounded-tl-sm">
        <span>Scoreboard</span>
      </div>
      <div className="px-2 pt-2">
        {users.map((user) => (
          <div>
            <span>{`${user.username}: ${user.points}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

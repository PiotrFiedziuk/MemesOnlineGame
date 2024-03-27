import { Modal } from "../components/Modal.tsx";
import { PlayersHands } from "../components/PlayersHands.tsx";
import { Table } from "../components/Table.tsx";
import { UserInterface } from "../components/UserInterface.tsx";
import { useGameDataStore } from "../stores/useGameDataStore.ts";
import { MemePreview } from "../components/MemePreview.tsx";

export const RoomPage = () => {
  const gameStatus = useGameDataStore((state) => state.gameStatus);

  return (
    <div className="bg-white w-full h-full overflow-hidden">
      <Modal
        isVisible={gameStatus.displayModal}
        text={gameStatus.modalMessage}
      />
      <MemePreview />
      <PlayersHands />
      <Table />
      <UserInterface />
    </div>
  );
};

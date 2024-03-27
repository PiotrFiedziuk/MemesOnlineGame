import { useGameDataStore } from "../stores/useGameDataStore.ts";

export const MemePreview = () => {
  const uri = useGameDataStore((state) => state.selectedMemePreview);
  if (!uri) return null;
  return (
    <div className="pointer-events-none absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 border-2 border-black rounded-md flex items-center justify-center z-20 bg-white">
      {uri}
    </div>
  );
};

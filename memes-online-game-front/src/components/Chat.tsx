import { useEffect, useRef, useState } from "react";
import { gameSocket } from "../api/websockets/gameSocket.ts";
import { useGameDataStore } from "../stores/useGameDataStore.ts";
import { ChatInput } from "./ChatInput.tsx";

export const Chat = () => {
  const chatMessages = useGameDataStore((state) => state.chatMessages);
  const [text, setText] = useState("");
  const [chatMessageTimestamp, setChatMessageTimestamp] = useState<number>(0);
  const chatRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (value: string) => {
    setText(value);
  };

  const handleClick = () => {
    const newTimestamp = Date.now();
    const diff = newTimestamp - chatMessageTimestamp;
    if (newTimestamp - chatMessageTimestamp > 500) {
      setChatMessageTimestamp(newTimestamp);
      gameSocket.invokeChatMessage(text);
      setText("");
    } else {
      useGameDataStore
        .getState()
        .addMessageToChat(
          `Jesteś Debilem. [Wiadomość możesz wysłać za ${diff} ms]`,
        );
    }
  };

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current?.scrollHeight,
    });
  }, [chatMessages]);

  return (
    <div className="w-1/4 h-full border-t-2 border-r-2 border-black rounded-tr-md overflow-hidden">
      <div className="w-full h-10 bg-blue-400 flex items-center justify-center border-b-2 border-black">
        <span>Chat</span>
      </div>
      <div
        ref={chatRef}
        className="w-full h-36 px-2 flex flex-col overflow-y-auto"
      >
        {chatMessages.map((textMessage, index) => (
          <span key={index}>{textMessage}</span>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        <div className="w-full flex items-center px-2 gap-2 p">
          <span>Chat: </span>

          <ChatInput value={text} onChange={handleChange} />
          <button
            type="submit"
            className="w-14 h-8 outline-0 border-none text-center bg-gray-400 rounded-md"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

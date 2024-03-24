import { useEffect, useRef, useState } from "react";
import { gameSocket } from "../api/websockets/gameSocket.ts";
import { useGameDataStore } from "../stores/useGameDataStore.ts";
import { ChatInput } from "./ChatInput.tsx";

export const Chat = () => {
  const chatMessages = useGameDataStore((state) => state.chatMessages);
  const [text, setText] = useState("");
  const chatRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (value: string) => {
    setText(value);
  };

  const handleClick = () => {
    gameSocket.invokeChatMessage(text);
    setText("");
  };

  useEffect(() => {
    chatRef.current?.scroll({
      top: chatRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [chatMessages]);

  return (
    <div className="w-1/4 h-full border-t-2 border-r-2 border-black rounded-tr-md overflow-hidden">
      <div className="w-full h-10 bg-blue-400 flex items-center justify-center border-b-2 border-black">
        <span>Chat</span>
      </div>
      <div className="w-full h-36 px-2 flex flex-col overflow-y-auto">
        {chatMessages.map((textMessage) => (
          <span>{textMessage}</span>
        ))}
      </div>
      <div ref={chatRef} className="w-full flex items-center px-2 gap-2 p">
        <span>Chat: </span>
        <ChatInput value={text} onChange={handleChange} />
        <button
          className="w-14 h-8 outline-0 border-none text-center bg-gray-400 rounded-md"
          onClick={handleClick}
        >
          Send
        </button>
      </div>
    </div>
  );
};

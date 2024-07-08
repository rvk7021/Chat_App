import Messages from "./messages";
import SendMessage from "./input";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../Store/useConversation";

const MessageContainer = () => {


  return (
    <div className="md:min-w-[450px] flex flex-col">
      {true ? (
        <NoChatSelectedComponent />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>
            <span className="text-gray-900 font-bold">Phoenix</span>
          </div>
          <Messages />
          <SendMessage />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelectedComponent = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome Phoenix</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

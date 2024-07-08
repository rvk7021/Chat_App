import { FiSend } from "react-icons/fi";

const SendMessage = () => {
  return (
    <form className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 text-white pr-10"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center p-3 text-white"
        >
          <FiSend />
        </button>
      </div>
    </form>
  );
};

export default SendMessage;

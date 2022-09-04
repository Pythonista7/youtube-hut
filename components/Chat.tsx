import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useLiveQuery, useMutation, useQuery } from "./generated/nextjs";

interface Props {
  id: String;
}

interface ChatMessage {
  _id?: string;
  name?: string | undefined;
  msg?: string | undefined;
  ts?: string | undefined;
}

const Messages: React.FC<{
  id: String;
  msgs: ChatMessage[];
  setMsgs: Dispatch<SetStateAction<ChatMessage[]>>;
}> = ({ id, msgs, setMsgs }) => {
  // TODO: Get from user property
  const color = "green";

  const messages = useLiveQuery.GetChatsById({
    input: {
      id: id as string,
    },
    debounceMillis: 5000,
  });

  useEffect(() => {
    if (messages.result.status === "ok") {
      const ordered = [...messages.result.data.chat_publicChats].reverse();
      setMsgs(ordered);
      console.log("Reordered!!");
    }
  }, [messages.result]);

  return (
    <>
      <h1 className="text-xl flex flex-row justify-center">CHAT ROOM: {id}</h1>
      <div className="flex flex-col h-full justify-end align-bottom">
        {msgs &&
          msgs.map((message) => (
            <div className="flex flex-row justify-between " key={message._id}>
              <div className="flex ">
                <div className={` text-${color}`}>{message.name}: </div>
                <div className="font-bold text-white ml-2"> {message.msg}</div>
              </div>
              {message.ts && (
                <div className="text-white ml-2">
                  {new Date(message.ts.toString()).toTimeString().slice(0, 5)}
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

const InputText: React.FC<{
  id: String;
  setMsgs: Dispatch<SetStateAction<ChatMessage[]>>;
}> = ({ id, setMsgs }) => {
  const { mutate: sendChatMsg, result: sendResponse } =
    useMutation.SendChatMsg();

  const [text, setText] = useState<string>("");

  const sendMessage = () => {
    if (!text || text.length === 0) return;
    if (!id) return;
    const inputData = {
      id: id as string,
      msg: text as string,
      name: "Ash",
      ts: new Date().toISOString(),
    };
    sendChatMsg({
      input: inputData,
    });
    setMsgs((prev) => [...prev, inputData]);
    setText("");
  };

  return (
    <div className="mt-2 w-full  ">
      <input
        type="text"
        placeholder=" Send Message"
        className=" bg-gray text-black w-11/12 h-10"
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            sendMessage();
          }
        }}
      />
      <button onClick={sendMessage} className="w-1/12 h-10 bg-blue-dark">
        Send
      </button>
    </div>
  );
};

// Main component
const Chat: React.FC<Props> = ({ id }) => {
  const [msgs, setMsgs] = useState<ChatMessage[]>([]);

  return (
    <div className="flex flex-col m-5 w-2/5 max-h-full  overflow-auto bg-gray-dark border-green border-2">
      <Messages id={id} msgs={msgs} setMsgs={setMsgs} />
      <InputText id={id} setMsgs={setMsgs} />
    </div>
  );
};

export default Chat;

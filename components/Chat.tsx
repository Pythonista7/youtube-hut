import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "../utils/types";
import { useLiveQuery, useMutation, useQuery } from "./generated/nextjs";

interface Props {
  id: String;
  user: User;
}

interface ChatMessage {
  _id?: string;
  name?: string | undefined;
  msg?: string | undefined;
  ts?: string | undefined;
  color?: string;
}

const Messages: React.FC<{
  id: String;
  msgs: ChatMessage[];
  setMsgs: Dispatch<SetStateAction<ChatMessage[]>>;
}> = ({ id, msgs, setMsgs }) => {
  const { result: theJoke } = useQuery.Joke({
    input: {
      category: "dev",
    },
    debounceMillis: 10000,
  });

  const messages = useLiveQuery.GetChatsById({
    input: {
      id: id as string,
    },
    debounceMillis: 5000,
  });

  const [joke, setJoke] = useState<String>("Ok let me see ...");

  useEffect(() => {
    if (messages.result.status === "ok") {
      if (messages.result.data.chat_publicChats.length > 0) {
        if (messages.result.data.chat_publicChats[0].id !== id) {
          // user went to a new video before the query was finished so we discard
          return;
        }
        const ordered = [...messages.result.data.chat_publicChats].reverse();
        setMsgs(ordered);
      }
    }
  }, [messages.result]);

  useEffect(() => {
    if (theJoke.status === "ok") {
      console.log("Setting a new joke: ", theJoke.data.chuck_getRandom?.value);
      setJoke(
        theJoke.data.chuck_getRandom?.value ||
          "Oh boi I'm running out of ideas..."
      );
    }
  }, [theJoke]);

  useEffect(() => {
    console.log("Id = ", id);
    setMsgs([]);
  }, [id]);

  return (
    <>
      <div className="flex flex-col h-full justify-end align-bottom">
        <h1 className="text-xl sticky top-0 flex flex-row justify-center  p-2">
          Public Chat Room : {id}
        </h1>
        {msgs &&
          msgs.length > 0 &&
          msgs.map((message) => (
            <div
              className="ml-2 flex flex-row justify-between "
              key={message._id}
            >
              <div className="flex ">
                <div
                  className={`font-bold text-${message.color || "white"}`}
                  style={{ color: `${message.color}` }}
                >
                  {message.name}:
                </div>
                <div className=" text-white ml-2"> {message.msg}</div>
              </div>
              {message.ts && (
                <div className="text-white ml-2 opacity-25">
                  {new Date(message.ts.toString()).toTimeString().slice(0, 5)}
                </div>
              )}
            </div>
          ))}
        {msgs && msgs.length === 0 && (
          <>
            <div className="ml-2  text-gray-light opacity-30">
              Chuck Norris is in the chat! Drop in and Say Hi :)
            </div>
            <div className="ml-2 flex flex-row justify-between " key={"Joke"}>
              <div className="flex ">
                <div
                  className={`font-bold text-white`}
                  style={{ color: `white` }}
                >
                  Chuck-Norris:
                </div>
                <div className=" text-white ml-2"> {joke}</div>
              </div>
              {
                <div className="text-white ml-2">
                  {new Date().toTimeString().slice(0, 5)}
                </div>
              }
            </div>
          </>
        )}
      </div>
    </>
  );
};

const InputText: React.FC<{
  id: String;
  user: User;
  setMsgs: Dispatch<SetStateAction<ChatMessage[]>>;
}> = ({ id, setMsgs, user }) => {
  const { mutate: sendChatMsg, result: sendResponse } =
    useMutation.SendChatMsg();

  const [text, setText] = useState<string>("");

  const sendMessage = () => {
    if (!text || text.length === 0) return;
    if (!id) return;
    const inputData = {
      id: id as string,
      msg: text as string,
      name: user.verified ? user.name + "(✔)" : user.name,
      ts: new Date().toISOString(),
      color: user.color,
    };
    sendChatMsg({
      input: inputData,
    });
    setMsgs((prev) => [...prev, inputData]);
    setText("");
  };

  return (
    <div className="mt-2 w-full sticky bottom-0 border-2 border-blue-dark border-opacity-30">
      <input
        type="text"
        placeholder=" Send Message"
        className="p-1 bg-gray-dark text-white w-11/12 h-10"
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            sendMessage();
          }
        }}
      />
      <button onClick={sendMessage} className="p-2 w-1/12 h-10 bg-blue-dark">
        Send
      </button>
    </div>
  );
};

// Main component
const Chat: React.FC<Props> = ({ id, user }) => {
  const [msgs, setMsgs] = useState<ChatMessage[]>([]);

  return (
    <div className="flex relative flex-col m-5 max-w-xl  max-h-full overflow-auto bg-gray-dark ">
      <Messages id={id} msgs={msgs} setMsgs={setMsgs} />
      <InputText user={user} id={id} setMsgs={setMsgs} />
    </div>
  );
};

export default Chat;

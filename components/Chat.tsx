interface Props {
  id: String;
}

const Chat: React.FC<Props> = ({ id }) => {
  return (
    <div className="flex flex-col m-5 w-2/5 min-h-screen bg-gray-dark border-green border-2">
      <h1 className="text-xl">CHAT: {id}</h1>
    </div>
  );
};

export default Chat;

import { useState } from "react";

interface Props {
  setUrl: (url: string) => void;
}

const UrlInput: React.FC<Props> = ({ setUrl }) => {
  const [input, setInput] = useState<string>(
    "https://music.youtube.com/watch?v=nkvg9c9oczM"
  );
  return (
    <div className="flex align-middle h-full m-2">
      <input
        className="w-4/5 p-2 m-2 rounded-lg text-black"
        type="text"
        id="url-input"
        placeholder="Youtube-URL"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setUrl(input);
          }
        }}
      />
      <button
        onClick={(e) => {
          setUrl(input);
        }}
        type="button"
        className="w-32 p-2 m-2 bg-blue-dark rounded-lg"
      >
        Watch
      </button>
    </div>
  );
};

export default UrlInput;

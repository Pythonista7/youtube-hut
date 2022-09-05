import React from "react";

interface Props {
  id: String;
}

const Player: React.FC<Props> = ({ id }) => {
  return (
    <div className="flex w-4/6 max-h-full m-5">
      {id && (
        <iframe
          className=" border-blue border-2 w-full h-full border-opacity-30 "
          src={`https://www.youtube.com/embed/${id}`}
          width="100%"
          height="100%"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      )}
    </div>
  );
};

export default Player;

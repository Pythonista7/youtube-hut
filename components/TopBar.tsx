import Image from "next/image";
import React from "react";
import Button from "./Button";

const TopBar: React.FC = () => {
  return (
    <div className="flex flex-row justify-between h-10 m-5">
      <div className="flex flex-row justify-around h-10">
        <Image src="/favicon.svg" width={50} height={50} alt="Yt-Hut" />
        <div className="text-4xl">YT HUT</div>
      </div>
      {/* <Button onClick={() => console.log("LOGIN")}> Login </Button> */}
    </div>
  );
};

export default TopBar;

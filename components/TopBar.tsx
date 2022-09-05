import { LogoutOptions } from "@wundergraph/nextjs";
import { User } from "../utils/types";
import Image from "next/image";
import React, { useEffect } from "react";
import Button from "./Button";
import { AuthProvider } from "./generated/nextjs";
import { getRandomColor } from "../utils/colors";

interface Props {
  login: (any) => void;
  logout: (options?: LogoutOptions | undefined) => Promise<Boolean>;
  user?: User;
  setUser: (user?: User) => void;
}

const TopBar: React.FC<Props> = ({ login, logout, user, setUser }) => {
  return (
    <div className="flex flex-row justify-between h-10 m-5">
      <div className="flex flex-row justify-around h-10">
        <Image src="/favicon.svg" width={50} height={50} alt="Yt-Hut" />
        <div className="text-4xl">YT HUT</div>
      </div>
      {user?.verified && (
        <Button
          onClick={() => {
            const u = {
              name: "Anon-" + (Math.random() * 1000).toFixed().toString(),
              verified: false,
              color: getRandomColor(),
            };
            setUser(u);
            localStorage.setItem("user", JSON.stringify(u));
            logout();
          }}
        >
          {" "}
          {(user as any).name}
        </Button>
      )}
      {!user?.verified && (
        <Button onClick={() => login(AuthProvider.github)}> Login </Button>
      )}
    </div>
  );
};

export default TopBar;

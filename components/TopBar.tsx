import { LogoutOptions } from "@wundergraph/nextjs";
import { User } from "@wundergraph/sdk/client";
import Image from "next/image";
import React, { useEffect } from "react";
import Button from "./Button";
import { AuthProvider, Role } from "./generated/nextjs";

interface Props {
  login: (any) => void;
  logout: (options?: LogoutOptions | undefined) => Promise<Boolean>;
  ghUser: User<Role> | null;
}

const TopBar: React.FC<Props> = ({ login, logout, ghUser }) => {
  useEffect(() => {
    console.log("TopBar ghUser", ghUser);
  }, [ghUser]);
  return (
    <div className="flex flex-row justify-between h-10 m-5">
      <div className="flex flex-row justify-around h-10">
        <Image src="/favicon.svg" width={50} height={50} alt="Yt-Hut" />
        <div className="text-4xl">YT HUT</div>
      </div>
      {ghUser && (
        <Button onClick={() => logout()}> {(ghUser as any).name}</Button>
      )}
      {!ghUser && (
        <Button onClick={() => login(AuthProvider.github)}> Login </Button>
      )}
    </div>
  );
};

export default TopBar;

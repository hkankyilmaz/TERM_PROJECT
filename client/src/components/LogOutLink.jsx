"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { removeTokens } from "@/services/jwtService";

function LogOutLink() {
  const router = useRouter();

  const handleClick = async () => {
    await removeTokens();
    window.location = "/";
  };

  return (
    <span className="cursor-pointer" onClick={handleClick}>
      Log Out
    </span>
  );
}

export default LogOutLink;

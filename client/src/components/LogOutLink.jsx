"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { removeTokens } from "@/services/jwtService";
import Cookies from "js-cookie";

function LogOutLink() {
  const router = useRouter();

  const handleClick = async () => {
    Cookies.remove("token_hemenal");
    Cookies.remove("ref_token_hemenal");
    Cookies.remove("user_name_hemenal");
    Cookies.remove("user_username_hemenal");
    Cookies.remove("user_email_hemenal");
    Cookies.remove("user_role_hemenal");

    setTimeout(() => {
      window.location.href = "/";
    }, 300);
  };

  return (
    <span className="cursor-pointer" onClick={handleClick}>
      Log Out
    </span>
  );
}

export default LogOutLink;

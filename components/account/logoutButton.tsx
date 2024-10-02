"use client";

import useMessage from "@/hooks/useMessage";
import { logout } from "@/lib/redux/features/auth";
import { useAppDispatch } from "@/lib/redux/store";
import { useRouter } from "nextjs-toploader/app";
import React from "react";

type Props = {
  text: string;
  className?: string;
};

const LogoutButton: React.FC<Props> = ({ className = "", text }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { alertMessage } = useMessage();

  // fake delay for 2s
  const delay = new Promise(resolve => setTimeout(resolve, 2000));

  const logoutUser = async () => {
    await delay;
    dispatch(logout());
    alertMessage("Logged out successfully", "success");
    router.replace("/");
  };

  return (
    <button onClick={logoutUser} className={className}>
      {text}
    </button>
  );
};
export default LogoutButton;

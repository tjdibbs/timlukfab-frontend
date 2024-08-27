"use client";

import useMessage from "@/hooks/useMessage";
import { logout } from "@/lib/redux/features/auth";
import { logoutOutUser } from "@/lib/redux/features/user";
import { useAppDispatch } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  text: string;
  className?: string;
};

const LogoutButton: React.FC<Props> = ({ className, text }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { alertMessage } = useMessage();

  // fake delay for 2s
  const delay = new Promise((resolve) => setTimeout(resolve, 2000));

  const logoutUser = async () => {
    await delay;
    dispatch(logout());
    dispatch(logoutOutUser());
    alertMessage("Logged out successfully", "success");
    router.replace("/");
  };

  return <button onClick={logoutUser}>{text}</button>;
};
export default LogoutButton;

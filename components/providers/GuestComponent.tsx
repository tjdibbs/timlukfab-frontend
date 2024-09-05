"use client";

import { useAppSelector } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

const GuestComponent = ({ children }: Props) => {
  const credentials = useAppSelector(state => state.auth.token);
  const router = useRouter();

  useEffect(() => {
    if (credentials) {
      router.replace("/account");
    }
  });

  return <div>{children}</div>;
};
export default GuestComponent;

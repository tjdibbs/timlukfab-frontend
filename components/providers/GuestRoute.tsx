"use client";

import { useAppSelector } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import PageLoader from "../ui/loading";

type Props = {
  children: ReactNode;
  className?: string;
};

const GuestRoute = ({ children, className = "" }: Props) => {
  const credentials = useAppSelector((state) => state.auth.token);
  const router = useRouter();

  useEffect(() => {
    if (credentials) {
      router.replace("/account");
    }
  }, [credentials]);

  return <div className={`${className}`}>{children}</div>;
};
export default GuestRoute;

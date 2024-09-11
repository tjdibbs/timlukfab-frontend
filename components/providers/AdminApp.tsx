"use client";

import { memo, ReactNode } from "react";
import StoreProvider from "./StoreProvider";
import { SnackbarProvider } from "notistack";
import GetUser from "@/lib/getUser";

const AdminApp = memo(({ children }: { children: ReactNode }) => {
  return (
    <StoreProvider>
      <GetUser />
      <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
    </StoreProvider>
  );
});

AdminApp.displayName = "AdminApp";
export default AdminApp;

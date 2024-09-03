"use client";

import { AppStore, makeStore } from "@/lib/redux/store";
import { setupListeners } from "@reduxjs/toolkit/query";
import { memo, ReactNode, useRef } from "react";
import { Provider } from "react-redux";

const StoreProvider = memo(({ children }: { children: ReactNode }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  setupListeners(storeRef.current.dispatch);

  return <Provider store={storeRef.current}>{children}</Provider>;
});

StoreProvider.displayName = "StoreProvider";
export default StoreProvider;

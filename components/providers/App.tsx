"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, Layout } from "antd";
import AppHeader from "../header/AppHeader";
import AppFooter from "../footer/Footer";
import { memo, ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/redux/store";
import { SnackbarProvider } from "notistack";
import { Lato } from "next/font/google";
import CartProvider from "../cart/cartProvider";
import GetUser from "@/lib/getUser";
import { setupListeners } from "@reduxjs/toolkit/query";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

type Props = {
  children: ReactNode;
};

const App = memo(({ children }: Props) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  setupListeners(storeRef.current.dispatch);

  return (
    <Provider store={storeRef.current}>
      <AntdRegistry>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: lato.style.fontFamily,
              fontSize: 16,
            },
          }}
        >
          <CartProvider>
            <SnackbarProvider maxSnack={3}>
              <GetUser />
              <Layout className={"app bg-white"}>
                <AppHeader />
                <main className="bg-white">{children}</main>
                <AppFooter />
              </Layout>
            </SnackbarProvider>
          </CartProvider>
        </ConfigProvider>
      </AntdRegistry>
    </Provider>
  );
});

App.displayName = "App";
export default App;

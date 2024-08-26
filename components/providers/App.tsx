"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, Layout } from "antd";
import AppHeader from "../header/AppHeader";
import AppFooter from "../footer/Footer";
import { memo, ReactNode } from "react";
import { Provider } from "react-redux";
import store from "@/lib/redux/store";
import { SnackbarProvider } from "notistack";
import { Lato } from "next/font/google";
import CartProvider from "../cart/cartProvider";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

type Props = {
  children: ReactNode;
};

const App = memo(({ children }: Props) => {
  return (
    <Provider store={store}>
      <AntdRegistry>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: lato.style.fontFamily,
            },
          }}
        >
          <CartProvider>
            <SnackbarProvider maxSnack={3}>
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

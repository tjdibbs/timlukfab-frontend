"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, Layout } from "antd";
import AppFooter from "../footer/Footer";
import { memo, ReactNode } from "react";
import { SnackbarProvider } from "notistack";
import { Lato } from "next/font/google";
import CartProvider from "../cart/cartProvider";
import GetUser from "@/lib/getUser";
import Header from "../header/header";
import { Toaster } from "react-hot-toast";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

type Props = {
  children: ReactNode;
};

const App = memo(({ children }: Props) => {
  return (
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
            <Toaster />
            <Layout className={"app bg-gray-50"}>
              <Header />
              <main className="bg-white">{children}</main>
              <AppFooter />
            </Layout>
          </SnackbarProvider>
        </CartProvider>
      </ConfigProvider>
    </AntdRegistry>
  );
});

App.displayName = "App";
export default App;

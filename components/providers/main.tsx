"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, Layout } from "antd";
import { ReactNode } from "react";
import { SnackbarProvider } from "notistack";
import { Lato } from "next/font/google";
import CartProvider from "../cart/cartProvider";
import GetUser from "@/lib/getUser";
import Header from "../header";
import { Toaster } from "react-hot-toast";
import AppFooter from "../footer";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

type Props = {
  children: ReactNode;
};

const App = ({ children }: Props) => {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: lato.style.fontFamily,
            fontSize: 16,
            colorLink: "#111",
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
};

export default App;

"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout } from "antd";
import AppHeader from "../header/AppHeader";
import AppFooter from "../footer/Footer";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "@/lib/redux/store";
import { SnackbarProvider } from "notistack";

type Props = {
  children: ReactNode;
};

const App = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <AntdRegistry>
        <SnackbarProvider maxSnack={3}>
          <Layout className={"app bg-white"}>
            <AppHeader />
            <main className="bg-white">{children}</main>
            <AppFooter />
          </Layout>
        </SnackbarProvider>
      </AntdRegistry>
    </Provider>
  );
};
export default App;

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout } from "antd";
import AppHeader from "../header/AppHeader";
import AppFooter from "../footer/Footer";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const App = ({ children }: Props) => {
  return (
    <AntdRegistry>
      <Layout className={"app bg-white"}>
        <AppHeader />
        <main className="bg-white">{children}</main>
        <AppFooter />
      </Layout>
    </AntdRegistry>
  );
};
export default App;

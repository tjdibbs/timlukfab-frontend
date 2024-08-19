"use client";

import Layout from "@comp/layout";
import PageLoading from "@comp/PageLoading";
import GetUser from "@lib/getUser";
import store from "@lib/redux/store";
import { ConfigProvider } from "antd";
import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";
import { Provider } from "react-redux";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "react-alice-carousel/lib/alice-carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import "../../styles/adjust.css";
import "../../styles/error.css";


type Props = {
  children: ReactNode;
};

const AppProvider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <Layout>
          <GetUser />
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#997a00",
                colorPrimaryBgHover: "#997a0060",
                colorPrimaryBg: "#997a00",
              },
            }}
          >
            {children}
          </ConfigProvider>
        </Layout>
      </SnackbarProvider>
    </Provider>
  );
};
export default AppProvider;

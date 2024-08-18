import Layout from "../../components/layout";
import { Provider } from "react-redux";
import store from "../../lib/redux/store";
import { SnackbarProvider } from "notistack";
import NextNProgress from "nextjs-progressbar";
import { ConfigProvider } from "antd";
import { NextRouter } from "next/router";
import { RouterContext } from "next/dist/shared/lib/router-context";

const createRouter = (params?: Partial<NextRouter>) => ({
  route: "/",
  pathname: "/",
  query: {},
  asPath: "/",
  basePath: "",
  back: cy.spy().as("back"),
  beforePopState: cy.spy().as("beforePopState"),
  prefetch: cy.stub().as("prefetch").resolves(),
  push: cy.spy().as("push"),
  reload: cy.spy().as("reload"),
  replace: cy.spy().as("replace"),
  events: {
    emit: cy.spy().as("emit"),
    off: cy.spy().as("off"),
    on: cy.spy().as("on"),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  defaultLocale: "en",
  domainLocales: [],
  isPreview: false,
});

export default function WrapWithRedux(props: { children: React.ReactNode }) {
  const router = createRouter();

  return (
    // @ts-ignore
    <RouterContext.Provider value={router}>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <Layout>
            <NextNProgress
              color="#ffcc00"
              startPosition={0.3}
              stopDelayMs={200}
              height={3}
              showOnShallow={true}
            />
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#997a00",
                  colorPrimaryBgHover: "#997a0060",
                  colorPrimaryBg: "#997a00",
                },
              }}
            >
              {props.children}
            </ConfigProvider>
          </Layout>
        </SnackbarProvider>
      </Provider>
    </RouterContext.Provider>
  );
}

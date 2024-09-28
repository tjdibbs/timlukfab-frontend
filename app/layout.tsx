import { PropsWithChildren, ReactNode } from "react";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";
import { Metadata, Viewport } from "next";
import App from "@/components/providers/App";
import StoreProvider from "@/components/providers/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Timlukfab Fashion Store",
  description:
    "Unisex fashion store, men and women fashion, great online shopping sites to buy from, online shopping, buyer protection guaranteed, online shopping in nigeria, online shopping sites with the best prices, online shopping sites, online shopping sites in nigeria, online shopping websites, online fashion shopping, fashion shopping, Pauloxuries Fashion Store, online shopping stores in lagos, Nigeria's number one online shopping, first choice fashion store, Everything fashion online shopping, order online, purchase genuine products, top brands, fast shipping, 100% satisfaction, find perfect match, fashion wears, decide what to wear, vintage wears, rugged wears, sneakers, designer",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Timlukfab",
  },
  icons: {
    icon: "/identity/favicon.png",
    apple: "/identity/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en-US",
    images: [
      {
        url: "/identity/logo.png",
        width: 600,
        height: 400,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pauloxuries",
  },
  robots: "INDEX,FOLLOW",
  keywords: [
    "unisex fashion store",
    "men and women fashion",
    "great online shopping sites to buy from",
    "online shopping",
    "buyer protection guaranteed",
    "online shopping in nigeria",
    "online shopping sites with the best prices",
    "online shopping sites",
    "online shopping sites in nigeria",
    "online shopping websites",
    "online fashion shopping",
    "fashion shopping",
    "Pauloxuries Fashion Store",
    "online shopping stores in lagos",
    "Nigeria's number one online shopping",
    "first choice fashion store",
    "Everything fashion online shopping",
    "order online",
    "purchase genuine products",
    "top brands",
    "fast shipping",
    "100% satisfaction",
    "find perfect match",
    "fashion wears",
    "decide what to wear",
    "vintage wears",
    "rugged wears",
    "sneakers",
    "designer",
  ],
  metadataBase: new URL("https://timlukfab.vercel.app/"),
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: PropsWithChildren<ReactNode>;
}) {
  return (
    <html lang="en">
      <body className={inter.className + "bg-white antialiased"}>
        <NextTopLoader showSpinner={false} />
        <StoreProvider>
          <App>{children}</App>
        </StoreProvider>
      </body>
    </html>
  );
}

import AdminHeader from "@/components/admin/header/header";
import { Lato } from "next/font/google";
import Link from "next/link";
import { PropsWithChildren, ReactNode } from "react";

import "../globals.css";
import { Metadata } from "next";
import AdminApp from "@/components/providers/AdminApp";
import NextTopLoader from "nextjs-toploader";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Timlukfab | Admin Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: PropsWithChildren<ReactNode>;
}) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <NextTopLoader showSpinner={false} />
        <AdminApp>
          <AdminHeader />
          <main>{children}</main>
        </AdminApp>
      </body>
    </html>
  );
}

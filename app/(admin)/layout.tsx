import { Lato } from "next/font/google";
import { PropsWithChildren, ReactNode } from "react";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export default function AdminLayout({
  children,
}: {
  children: PropsWithChildren<ReactNode>;
}) {
  return (
    <html lang="en">
      <body className={lato.className}>{children}</body>
    </html>
  );
}

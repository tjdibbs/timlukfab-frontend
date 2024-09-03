import { ReactNode } from "react";

import Link from "next/link";

export default function CategoryPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="min-h-screen bg-gray-50">
      <div className="wrapper">
        <div className="max-w-xs"></div>
        {children}
      </div>
    </section>
  );
}

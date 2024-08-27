import { ReactNode } from "react";
import AccountHeader from "./header";
import Sidebar from "./sidebar";
import ProtectedRoute from "@/components/providers/ProtectedRoute";

type Props = {
  children: ReactNode;
};

export default function AccountLayout({ children }: Props) {
  return (
    <section>
      <AccountHeader />
      <div className="wrapper py-6 md:grid md:grid-cols-12">
        <Sidebar />
        <div className="col-span-9 md:px-4">{children}</div>
      </div>
    </section>
  );
}

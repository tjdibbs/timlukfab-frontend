import { Metadata } from "next";
import ResetPassword from "./ResetPassword";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your password",
};

export default function Page() {
  return <ResetPassword />;
}

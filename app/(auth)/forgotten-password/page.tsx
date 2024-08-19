import { Metadata } from "next";
import ForgottenPassword from "./ForgottenPassword";

export const metadata: Metadata = {
  title: "Forgotten Password",
  description: "Forgotten Password",
};

export default function Page() {
  return <ForgottenPassword />;
}

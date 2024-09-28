import VerifyEmail from "@/components/auth/verify-email";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email | Timlukfab Fashion Store",
  description: "Verify your email to complete your registration",
};

export default function Page() {
  return <VerifyEmail />;
}

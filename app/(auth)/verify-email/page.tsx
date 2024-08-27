import { Metadata } from "next";
import VerifyEmail from "./VerifyEmail";
import ProtectedRoute from "@/components/providers/ProtectedRoute";

export const metadata: Metadata = {
  title: "Verify Email | Timlukfab Fashion Store",
  description: "Verify your email to complete your registration",
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <VerifyEmail />;
}

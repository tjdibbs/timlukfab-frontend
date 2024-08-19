import { Metadata } from "next";
import AboutUs from "./AboutUs";

export const metadata: Metadata = {
  title: `About Us`,
};

export default function Page() {
  return <AboutUs />;
}

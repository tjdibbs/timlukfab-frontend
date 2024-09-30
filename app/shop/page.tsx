import { Metadata } from "next";
import Shop from "@/components/shop";

export const metadata: Metadata = {
  title: "Shop | Timlukfab Fashion Store",
};

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <section className="pb-10 pt-6">
      <div className="wrapper">
        <Shop searchParams={searchParams} />
      </div>
    </section>
  );
}

import { Metadata } from "next";
import Shop from "@components/shop/shop";

export const metadata: Metadata = {
  title: "Shop | Timlukfab Fashion Store",
};

export default function Page() {
  return (
    <section className="pb-10 pt-6">
      <div className="wrapper">
        <Shop />
      </div>
    </section>
  );
}

import ImageSlider from "@/components/products/imageSlider";
import ProductData from "@/components/products/productdata";
import ProductInfo from "@/components/products/productInfo";

export default function Page() {
  return (
    <section className="py-8">
      <div className="wrapper grid-cols-12 gap-8 max-md:space-y-8 md:grid md:items-start">
        <ImageSlider />
        <ProductInfo />
        <ProductData />
      </div>
    </section>
  );
}

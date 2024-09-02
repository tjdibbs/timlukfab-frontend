import ImageSlider from "@/components/products/imageSlider";
import ProductData from "@/components/products/productdata";
import ProductInfo from "@/components/products/productInfo";
import RelatedProducts from "@/components/products/relatedproducts";

export default function Page() {
  return (
    <section className="py-8">
      <div className="wrapper">
        <div className="grid-cols-12 gap-8 max-md:space-y-8 md:grid md:items-start">
          <ImageSlider />
          <ProductInfo />
        </div>
        <ProductData />
        <RelatedProducts />
      </div>
    </section>
  );
}

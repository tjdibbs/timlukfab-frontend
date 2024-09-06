import ImageShow from "@/components/products/image-show";
import ImageSlider from "@/components/products/imageSlider";
import ProductData from "@/components/products/productdata";
import ProductInfo from "@/components/products/productInfo";
import RelatedProducts from "@/components/products/relatedproducts";

export default function Page() {
  return (
    <section className="py-4">
      <div className="wrapper">
        <div className="grid-cols-12 gap-8 lg:grid lg:items-start">
          <ImageShow />
          <ProductInfo />
        </div>
        <ProductData />
        <RelatedProducts />
      </div>
    </section>
  );
}

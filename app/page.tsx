import BestSelling from "@/components/home/BestSelling";
import BrowseCategories from "@/components/home/BrowseCategories";
import Carousel from "@/components/home/Carousel";
import Products from "@/components/home/Products";
import Timlukfab from "@/components/home/Timlukfab";

export default function Page() {
  return (
    <main>
      <Carousel />
      <BestSelling />
      <Products />
      <BrowseCategories />
      <Timlukfab />
    </main>
  );
}

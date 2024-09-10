import { Fragment } from "react";
import { Separator } from "../ui/separator";
import { getProducts, getSingleProduct } from "@/lib/actions/products";
import Product from "../product";

const RelatedProducts = async ({ id }: { id: string }) => {
  const { product } = await getSingleProduct(id);
  const {
    result: { products },
  } = await getProducts();

  const filtered = products.filter(p =>
    p.categories.some(category =>
      product.categories.some(c => c.id === category.id)
    )
  );

  return (
    <Fragment>
      <Separator className="mt-12" />
      <h3 className="mb-8 mt-4 text-xl font-semibold tracking-wide text-dark_grey max-md:text-lg">
        RELATED PRODUCTS
      </h3>
      <div className="col-span-9 grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
        {filtered.slice(0, 4).map((product, index) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </Fragment>
  );
};
export default RelatedProducts;

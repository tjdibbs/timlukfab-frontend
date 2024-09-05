import EditForm from "@/components/admin/products/edit";
import ErrorMessage from "@/components/admin/ui/error-message";
import { Separator } from "@/components/ui/separator";
import { getCategories } from "@/lib/actions/categories";
import { getColors } from "@/lib/actions/colors";
import { getFiles } from "@/lib/actions/files";
import { getProducts, getSingleProduct } from "@/lib/actions/products";
import { getSizes } from "@/lib/actions/sizes";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  const {
    result: { products },
  } = await getProducts();

  return products.map(product => ({
    id: product.id.toString(),
  }));
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    notFound();
  }

  const { product } = await getSingleProduct(id);

  if (!product) {
    return <ErrorMessage />;
  }

  const {
    result: { colors },
  } = await getColors();
  const {
    result: { files },
  } = await getFiles();
  const {
    result: { categories },
  } = await getCategories();
  const {
    result: { sizes },
  } = await getSizes();

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="wrapper py-8">
        <div className="mb-6">
          <div>
            <h3 className="mb-1 text-3xl font-extrabold">Edit Product</h3>
            <p className="text-sm text-gray-500">Editing {product.name}</p>
          </div>
          <Separator className="my-4" />
        </div>
        <EditForm
          colors={colors}
          sizes={sizes}
          categories={categories}
          images={files}
          product={product}
        />
      </div>
    </section>
  );
}

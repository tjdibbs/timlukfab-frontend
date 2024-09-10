import CreateForm from "@/components/admin/products/form";
import { Separator } from "@/components/ui/separator";
import { getCategories } from "@/lib/actions/categories";
import { getColors } from "@/lib/actions/colors";
import { getFiles } from "@/lib/actions/files";
import { getSizes } from "@/lib/actions/sizes";
import { getSubCategories } from "@/lib/actions/sub-categories";

export default async function Page() {
  const {
    result: { colors },
  } = await getColors();
  const {
    result: { files, hasMore },
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
            <h3 className="mb-1 text-3xl font-extrabold">Create Product</h3>
            <p className="text-sm text-gray-500">
              Add a new product to your store
            </p>
          </div>
          <Separator className="my-4" />
        </div>
        <CreateForm
          colors={colors}
          sizes={sizes}
          categories={categories}
          images={files}
          imagesHasMore={hasMore}
        />
      </div>
    </section>
  );
}

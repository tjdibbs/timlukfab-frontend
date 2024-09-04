import CreateForm from "@/components/admin/sub-categories/form";
import { Separator } from "@/components/ui/separator";
import { getCategories } from "@/lib/actions/categories";
import { getFiles } from "@/lib/actions/files";
import { notFound } from "next/navigation";

export default async function Page() {
  const {
    result: { files },
  } = await getFiles();

  const {
    result: { categories },
  } = await getCategories();

  const sorted = files.sort((a, b) => a.id - b.id);

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="wrapper py-8">
        <div className="mb-6">
          <div>
            <h3 className="mb-1 text-3xl font-extrabold">
              Create Sub Category
            </h3>
            <p className="text-sm text-gray-500">
              Add a new category to your store
            </p>
          </div>
          <Separator className="my-4" />
        </div>
        <CreateForm images={sorted} categories={categories} />
      </div>
    </section>
  );
}

import EditForm from "@/components/admin/sub-categories/edit-form";
import ErrorMessage from "@/components/admin/ui/error-message";
import { Separator } from "@/components/ui/separator";
import { getCategories } from "@/lib/actions/categories";

import { getFiles } from "@/lib/actions/files";
import {
  getSingleCategory,
  getSubCategories,
} from "@/lib/actions/sub-categories";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const {
    result: { subcategories },
  } = await getSubCategories();

  return subcategories.map(category => ({
    id: String(category.id),
  }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    notFound();
  }

  const { category, success } = await getSingleCategory(id);
  const {
    result: { categories },
    success: categoriesSuccess,
  } = await getCategories();

  if (!success || !categoriesSuccess) {
    return <ErrorMessage />;
  }

  const {
    result: { files },
  } = await getFiles();

  const sorted = files.sort((a, b) => a.id - b.id);

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="wrapper py-8">
        <div className="mb-6">
          <div>
            <h3 className="mb-1 text-3xl font-extrabold">
              Edit This Sub Category
            </h3>
            <p className="text-sm text-gray-500">Editing {category.name}</p>
          </div>
          <Separator className="my-4" />
        </div>
        <EditForm
          images={sorted}
          subcategory={category}
          id={id}
          categories={categories}
        />
      </div>
    </section>
  );
}

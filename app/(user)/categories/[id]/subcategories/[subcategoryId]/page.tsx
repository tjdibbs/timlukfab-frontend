import Subcategory from "@/components/subcategories";
import { getSubCategories } from "@/lib/actions/sub-categories";

export const generateStaticParams = async () => {
  const {
    result: { subcategories },
  } = await getSubCategories();

  return subcategories.map(subcategory => ({
    id: subcategory.categoryId.toString(),
    subcategoryId: subcategory.id.toString(),
  }));
};

export default function Page({
  params,
}: {
  params: { id: string; subcategoryId: string };
}) {
  return (
    <section className="pb-10 pt-6">
      <div className="wrapper">
        <Subcategory subcategoryId={params.subcategoryId} />
      </div>
    </section>
  );
}

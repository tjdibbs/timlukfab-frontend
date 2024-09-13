import Subcategory from "@/components/subcategories";
import { getSubCategories } from "@/lib/actions/sub-categories";

export const generateStaticParams = async () => {
  return [];
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

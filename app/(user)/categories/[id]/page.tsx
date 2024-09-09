import Category from "@/components/categories";
import { getCategories } from "@/lib/actions/categories";

export const generateStaticParams = async () => {
  const {
    result: { categories },
  } = await getCategories();

  return categories.map(category => ({
    id: category.id.toString(),
  }));
};

export default function Page({ params }: { params: { id: string } }) {
  return (
    <section className="pb-10 pt-6">
      <div className="wrapper">
        <Category id={params.id} />
      </div>
    </section>
  );
}

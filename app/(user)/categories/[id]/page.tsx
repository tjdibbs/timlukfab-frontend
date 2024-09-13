import Category from "@/components/categories";

export const generateStaticParams = async () => {
  return [];
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

import Category from '@/components/categories';

export const generateStaticParams = async () => {
  return [];
};

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <section className='pb-10 pt-6'>
      <div className='wrapper'>
        <Category id={params.id} searchParams={searchParams} />
      </div>
    </section>
  );
}

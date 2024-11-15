import { Fragment } from 'react';
import { Separator } from '../ui/separator';
import { getProducts, getSingleProduct } from '@/lib/actions/products';
import Product from '../product';
import ProductsComponent from '../ui/products';

const RelatedProducts = async ({ id }: { id: string }) => {
  const { product } = await getSingleProduct(id);
  const {
    result: { products },
  } = await getProducts({ pageNumber: '1' });

  const filtered = products
    .filter(p =>
      p.categories.some(category =>
        product.categories.some(c => c.id === category.id)
      )
    )
    .filter(p => p.id !== product.id);

  return (
    <Fragment>
      <Separator className='mt-12' />
      <h3 className='mb-8 mt-4 text-xl font-semibold tracking-wide text-dark_grey max-md:text-lg'>
        RELATED PRODUCTS
      </h3>

      <ProductsComponent
        className='col-span-9 grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5'
        products={filtered.slice(0, 4)}
      />
    </Fragment>
  );
};
export default RelatedProducts;

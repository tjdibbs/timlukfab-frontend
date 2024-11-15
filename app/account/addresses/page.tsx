import Addresses from './addresses';

export default function Page() {
  return (
    <div>
      <p className='mb-8 text-[#555]'>
        The following addresses will be used on the checkout page by default.
      </p>
      <Addresses />
    </div>
  );
}

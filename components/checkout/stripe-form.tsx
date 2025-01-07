import useMessage from '@/hooks/useMessage';
import { useCreatePaymentIntentMutation } from '@/lib/redux/services/stripe';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useMemo, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckoutForm from './checkout-form';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { Dialog, DialogContent } from '../ui/dialog';
import Loading from '../loading';
import { Button, Modal, Popconfirm, PopconfirmProps } from 'antd';
import { useRouter } from 'nextjs-toploader/app';
import { useCancelOrderMutation } from '@/lib/redux/services/orders';
import { XIcon } from 'lucide-react';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const StripeForm = ({
  show,
  cartTotal,
  orderId,
}: {
  show: boolean;
  cartTotal: number;
  orderId: number;
}) => {
  const [clientSecret, setClientSecret] = useState('');

  const { alertMessage } = useMessage();

  const [createIntent, { isLoading: isPending }] =
    useCreatePaymentIntentMutation();

  const handleCreate = async () => {
    try {
      const res = await createIntent({
        amount: cartTotal || 0,
        currency: 'usd',
      }).unwrap();
      setClientSecret(res.clientSecret);
    } catch (error) {
      alertMessage('Error initiating payment', 'error');
    }
  };

  const options: StripeElementsOptions = useMemo(
    () => ({
      clientSecret,
    }),
    [clientSecret]
  );

  useEffect(() => {
    handleCreate();
  }, []);

  if (!stripePromise || !clientSecret || isPending) return <Loading />;

  return (
    <>
      <Modal
        open={true}
        footer={null}
        width={700}
        closeIcon={<CloseButton orderId={orderId} />}
      >
        <Elements stripe={stripePromise} options={options}>
          <StripeCheckoutForm />
        </Elements>
      </Modal>
    </>
  );
};

const CloseButton = ({ orderId }: { orderId: number }) => {
  const router = useRouter();
  const [cancel, { isLoading }] = useCancelOrderMutation();

  const { alertMessage } = useMessage();

  const confirm: PopconfirmProps['onConfirm'] = async () => {
    try {
      await cancel(orderId).unwrap();
      alertMessage('Order cancelled', 'success');
      router.push('/account/orders');
    } catch (error) {
      alertMessage('Error cancelling payment', 'error');
    }
  };

  return (
    <Popconfirm
      title='Cancel Payment'
      description='Are you sure to cancel this payment?'
      onConfirm={confirm}
      okButtonProps={{ loading: isLoading }}
      okText='Yes'
      cancelText='No'
    >
      <Button
        disabled={isLoading}
        icon={<XIcon className='h-4 w-4' />}
        danger
      />
    </Popconfirm>
  );
};

export default StripeForm;

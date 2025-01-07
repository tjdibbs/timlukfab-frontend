import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { Button } from '../ui/button';
import { FormEvent, useState } from 'react';
import { TailwindSpinner } from '../ui/spinner';
import useMessage from '@/hooks/useMessage';

const StripeCheckoutForm = () => {
  const [isProcessing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const { alertMessage } = useMessage();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/billing?success=true`,
      },
    });

    if (result.error) {
      alertMessage(result.error.message, 'error');
    }

    setProcessing(false);
  };

  return (
    <form className='space-y-8' onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        type='submit'
        className='w-full'
        size='lg'
        disabled={isProcessing}
      >
        {isProcessing ? <TailwindSpinner className='h-4 w-4' /> : 'Pay'}
      </Button>
    </form>
  );
};
export default StripeCheckoutForm;

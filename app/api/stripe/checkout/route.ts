import { CartController } from '@/types/cart';
import { calculateCartItemAdditionalPrice } from '@/utils/functions';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const { cartItems, orderId } = (await request.json()) as {
      cartItems: CartController.CartItem[];
      orderId: string;
    };

    const lineItems = cartItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.name,
          images: [item.product.medias[0].path],
        },
        unit_amount:
          (Number(item.product.price) +
            calculateCartItemAdditionalPrice(item)) *
          100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      submit_type: 'pay',
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing?success=true&orderId=${orderId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing?cancel=true`,
    });

    return NextResponse.json({ session }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server', { status: 500 });
  }
}

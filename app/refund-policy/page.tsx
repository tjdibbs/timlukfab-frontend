export default function Page() {
  return (
    <main className='wrapper pb-10 pt-6'>
      <div className='space-y-6'>
        <div>
          <div className='mb-2 text-2xl font-bold'>Returns Policy</div>
          <h5 className='font-medium text-slate-800'>
            Returned items must comply with our returns policy:
          </h5>
        </div>

        <div className='policies space-y-4'>
          <ul className='space-y-2'>
            <li>
              Items must be returned unworn, undamaged and unused, with all tags
              attached and the original packaging included.
            </li>
            <li>
              Footwear and accessories must be returned with the original
              branded boxes and dust bags, where provided, and placed inside a
              protective outer box for shipping.
            </li>
            <li>
              When trying on footwear, please take care not to mark the soles or
              damage the shoe box.
            </li>
            <li>
              If an item has a Timlukfab tag or brand tag attached, it must be
              returned with the tag in its original position.
            </li>
            <li>
              Beauty and cosmetic products must be returned unopened and unused,
              with the seals of any packaging still intact.
            </li>
            <li>
              Hosiery, lingerie and swimwear items must be returned with the
              hygiene seals attached and in unopened and undamaged product
              packaging, where applicable.
            </li>
            <li>
              Lingerie and swimwear must only be tried on over your own
              undergarments. We will not accept any returns that have been worn
              or are soiled.
            </li>
            <li>
              Jewellery must be returned in the same condition it arrived in,
              including all branded packaging and documents provided with it.
            </li>
          </ul>

          <div className='talks space-y-4'>
            <p>
              Please take care when trying on your purchases and return them in
              the same condition you received them. Any returns that do not meet
              our policy will not be accepted.
            </p>
            <p>
              If you placed an order as a guest, you can start your return here.
              To return or cancel an item that has been made to your
              specifications, please view our{' '}
              <span className='font-bold'>Customized Items</span> section below
              for further information.
            </p>
          </div>
        </div>

        <div className='process space-y-6'>
          <h4 className='text-xl font-bold text-slate-800'>Return Process</h4>

          <div className='space-y-4'>
            <h5 className='font-medium text-slate-800'>Free Return Pick Up</h5>
            <p>
              We are pleased to offer a free returns collection service to all
              customers for any purchases that meet our Returns Policy.
            </p>
            <p>
              Your item returned must arrive at Timlukfab no later than 7 days
              after your delivery date. We recommend that you book your return
              pick-up from the day of your delivery date to ensure that it
              arrives at the within 7 days.
            </p>
          </div>

          <div className='space-y-4'>
            <h5 className='font-medium text-slate-800'>
              To book a free returns pick-up:
            </h5>
            <ol className='list-decimal space-y-2 pl-5'>
              <li>
                Go to <span className='font-bold'>My Orders & Returns</span> if
                you have an account, or click here to start a return if you
                placed an order as a guest.
              </li>
              <li>
                Choose a return <span className='font-bold'>By courier</span>{' '}
                and select the item(s) for return.
              </li>
              <li>
                Confirm your pick up address and a convenient collection time.
              </li>
            </ol>
            <p>
              We will send you a collection confirmation email with all the
              details you need to complete the return.
            </p>
            <p className='text-slate-600'>
              Please note: We can only offer a free returns pick up from the
              same destination your order was delivered to.
            </p>
          </div>

          <div className='space-y-4'>
            <h5 className='font-medium text-slate-800'>What happens next?</h5>
            <ol className='list-decimal space-y-2 pl-5'>
              <li>
                Prepare your package with the returns documents enclosed in your
                order. Here's how:
              </li>
              <li>
                Place any unwanted items with all original packaging and leave
                it open for the courier to check the contents.
              </li>
            </ol>
          </div>

          <div className='space-y-4'>
            <h5 className='font-medium text-slate-800'>
              Returns with Click & Collect
            </h5>
            <p>
              Take the return to your chosen location, along with our returns
              confirmation email, and we'll do the rest. Further information can
              be found in our Click & Collect section.
            </p>
          </div>

          <div className='space-y-4'>
            <h5 className='font-medium text-slate-800'>Cancelling an order</h5>
            <p>
              Depending on where you live, you can also choose to cancel your
              order. If you choose this option we will refund you the full price
              for any returned item that meets our Returns Policy and the
              original delivery fee; however, you will be responsible for the
              cost and arrangement of returning the item(s) to the Timlukfab.
            </p>
            <p>
              Please view our Terms & Conditions for further information on
              cancelling an order under the CCRs or contact our Customer Service
              Advisors for assistance.
            </p>
          </div>
        </div>

        <div className='space-y-4'>
          <h4 className='text-xl font-bold text-slate-800'>Refunds</h4>
          <p>
            Once your return has been received and accepted by us, your refund
            will be completed via the original payment method, excluding the
            delivery costs. We'll keep you updated every step of the way. You
            can follow the return of your package with our carrier using the
            tracking number on your Returns Label, or you can check the status
            in My Account under{' '}
            <span className='font-bold'>Orders & Returns</span>
          </p>
        </div>

        <div className='space-y-4'>
          <h4 className='text-xl font-bold text-slate-800'>Customised Items</h4>
          <p>
            Due to the nature of customised orders, and the fact that they have
            been specially created for you, we will not be able to accept
            returns unless the customised pieces were damaged or faulty when
            delivered to you.
          </p>

          <h5 className='font-medium text-slate-800'>Pre-Owned Items</h5>
          <p>
            Pre-owned goods sold at Timlukfab have undergone rigorous inspection
            prior to sale to guarantee their quality, precision and
            authenticity. As such, these valuable and timeless pieces should be
            treated with great care as with new items, and returned in the same
            condition in which they were received.
          </p>
          <p>
            If any of your purchases arrive in a flawed or faulty condition, or
            without Timlukfab and designer tags attached, please contact
            Customer Service for assistance with your return.
          </p>
        </div>
      </div>
    </main>
  );
}

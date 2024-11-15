export default function Page() {
  return (
    <div className='component-wrap container'>
      <div className='wrapper'>
        <div>
          <div
            className='page-title'
            style={{ fontSize: '25px', color: 'rgb(171, 86, 0)' }}
          >
            Returns Policy
          </div>
          <h5>Returned items must comply with our returns policy:</h5>
        </div>

        <div className='policies'>
          <ul>
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
              If an item has a Pauloxuries tag or brand tag attached, it must be
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
          <div className='talks'>
            <p>
              Please take care when trying on your purchases and return them in
              the same condition you received them. Any returns that do not meet
              our policy will not be accepted.
            </p>

            <p>
              If you placed an order as a guest, you can start your return here.
              To return or cancel an item that has been made to your
              specifications, please view our{' '}
              <q>
                <b>Customized Items</b>
              </q>{' '}
              section below for further information.
            </p>
          </div>
          <div className='process'>
            <h4>Return Process</h4>
            <h5>Free Return Pick Up</h5>
            <p>
              We are pleased to offer a free returns collection service to all
              customers for any purchases that meet our Returns Policy.
            </p>
            <p>
              Your item returned must arrive at Pauloxuries no later than 7 days
              after your delivery date. We recommend that you book your return
              pick-up from the day of your delivery date to ensure that it
              arrives at the within 7 days.
            </p>
            <h5>To book a free returns pick-up:</h5>
            <ol>
              <li>
                Go to <q>My Orders & Returns</q> if you have an account, or
                click here to start a return if you placed an order as a guest.
              </li>
              <li>
                Choose a retur <q>By courier</q> and select the item(s) for
                return.
              </li>
              <li>
                Confirm your pick up address and a convenient collection time.
              </li>
            </ol>
            <p>
              We will send you a collection confirmation email with all the
              details you need to complete the return.
            </p>
            <p>
              Please note: We can only offer a free returns pick up from the
              same destination your order was delivered to.
            </p>

            <h5>What happens next?</h5>
            <ol>
              <li>
                Prepare your package with the returns documents enclosed in your
                order. Here’s how:
              </li>
              <li>
                Place any unwanted items with all original packaging and leave
                it open for the courier to check the contents.
              </li>
            </ol>
            <h5>Returns with Click & Collect</h5>
            <p>
              Take the return to your chosen location, along with our returns
              confirmation email, and we’ll do the rest. Further information can
              be found in our Click & Collect section.
            </p>
            <p>
              Further information can be found in our Click & Collect section.
            </p>
            <h5>Cancelling an order</h5>
            <p>
              Depending on where you live, you can also choose to cancel your
              order. If you choose this option we will refund you the full price
              for any returned item that meets our Returns Policy and the
              original delivery fee; however, you will be responsible for the
              cost and arrangement of returning the item(s) to the Pauloxuries.
            </p>
            <p>
              Please view our Terms & Conditions for further information on
              cancelling an order under the CCRs or contact our Customer Service
              Advisors for assistance.
            </p>
          </div>
          <br />
          <h4>Refunds</h4>
          <p>
            Once your return has been received and accepted by us, your refund
            will be completed via the original payment method, excluding the
            delivery costs. We’ll keep you updated every step of the way. You
            can follow the return of your package with our carrier using the
            tracking number on your Returns Label, or you can check the status
            in My Account under
            <q>Orders & Returns</q>
          </p>
          <br />
          <h4>Customised Items</h4>
          <p>
            Due to the nature of customised orders, and the fact that they have
            been specially created for you, we will not be able to accept
            returns unless the customised pieces were damaged or faulty when
            delivered to you.
          </p>
          <h5>Pre-Owned Items</h5>
          <p>
            Pre-owned goods sold at Pauloxuries have undergone rigorous
            inspection prior to sale to guarantee their quality, precision and
            authenticity. As such, these valuable and timeless pieces should be
            treated with great care as with new items, and returned in the same
            condition in which they were received.
          </p>
          <p>
            If any of your purchases arrive in a flawed or faulty condition, or
            without Pauloxuries and designer tags attached, please contact
            Customer Service for assistance with your return.
          </p>
        </div>
      </div>
    </div>
  );
}

import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import dynamic from "next/dynamic";

function Shipping(): JSX.Element {
  return (
    <div className="container component-wrap">
      <div className="wrapper">
        <div
          style={{
            fontSize: "25px",
            color: "rgb(171, 86, 0)",
            fontWeight: 700,
            margin: 0,
          }}
        >
          Order & Shipping
        </div>
        <h4 style={{ fontSize: "20px", fontFamily: "nunito" }}>
          Shipping Information
        </h4>
        <p>
          <span style={{ fontSize: "25px" }}>P</span>auloxuries orders are
          delivered Monday to Friday between 9am and 5pm. As every order is
          unique, shipping costs will vary depending on the size, weight and
          destination of your chosen items. For those last minute purchases,
          Express delivery is available to most destinations and Same Day
          delivery is offered in selected cities.
        </p>
        <p>
          Depending on your location, we also offer a Flat Shipping Fee for
          orders above the following thresholds:
        </p>
        <p>
          All relevant delivery options available for your order and to your
          destination will be displayed at checkout.
        </p>
        <div>
          <h5 style={{ fontSize: "16px", padding: 0, margin: 0 }}>
            <b>Shipping Times:</b>
          </h5>
          <p>
            Express delivery:Nigeria delivery within 2-4 days Rest of the world:
            delivery within 3-7 days.
          </p>
          <p>
            Standard delivery:Nigeria delivery within 3-7 days Rest of the
            world: delivery within 5-10 days.
          </p>
        </div>
        <div>
          <p>
            <b>
              <u>Note:</u>
            </b>{" "}
            Our shipping times should be used as a guide only and are based on
            time from Pauloxuries. We cannot take responsibility for customs
            clearance delays or failed payment approval, though we will try to
            minimise any potential delays.
          </p>
        </div>

        <h4 style={{ fontWeight: 700 }}>SAME DAY DELIVERY</h4>
        <h5>Shipping Information</h5>
        <p>
          We are pleased to offer a Same Day delivery service in Lagos state
          only.
        </p>
        <p>
          When browsing our site, you can select ‘Same Day Delivery” This will
          filter all the items that are available for Same Day delivery, so
          you’ll be able to shop only the styles that can be delivered that day.
        </p>
        <p>
          If Same Day delivery is possible for your address, this option will
          also show at checkout after you enter your shipping address. The Same
          Day delivery cost varies from city to city and will be visible on the
          Shipping page before completing your order.
        </p>
        <p>
          As we require a signature for all orders, delivery to your various
          location.
        </p>
        <h5>Shipping Times</h5>
        <p>
          Place your order by 10 am local time and your Pauloxuries purchase
          will be with you by 7pm that same day (Monday to Friday, excluding
          public holidays). Orders placed after 10 local time will be delivered
          the following business day.
        </p>
        <h5>
          <b>Order Changes & Cancellations</b>
        </h5>
        <p>
          If you would like to make changes to your order or the arranged
          delivery time, please contact Customer Service as soon as possible and
          we will be happy to assist you in any way possible.
        </p>
        <p>
          If you miss a delivery, we will be in touch with you to arrange
          another suitable delivery date. If the second delivery attempt is
          unsuccessful, we’ll cancel your order for a refund.
        </p>
        <p>
          We can attempt to cancel your purchase if you change your mind,
          however as Same Day orders are prioritized, cancellations for these
          orders are not always possible. You can instead return your order for
          a refund via our free and easy returns service.
        </p>
        <p>
          <a href="">
            Please visit our Returns & Refunds page for further information{" "}
          </a>
          <div>Same Day delivery is available to the following locations:</div>
        </p>
        <h4>ORDER TRACKING</h4>
        <p>
          After placing an order, you will receive an email containing all the
          details. We may also be in touch if we need further information to
          verify your payment. Once your order is confirmed, it will be
          dispatched within 2 business days.
        </p>
        <p>
          Depending on your location and chosen shipping method, delivery will
          be made following the dispatched date. We will keep you updated with
          tracking information and an estimated delivery date.
        </p>
        <div>
          <p style={{ textDecoration: "underline" }}>
            <b>Note:</b>
          </p>
          You can always contact our customer service care help line for
          tracking of your product.
        </div>
        <h4>CANCELLATIONS</h4>
        <p>
          As your purchase will be prepared quickly for dispatch, please contact
          Customer Service as soon as possible to cancel or make any changes to
          an order. While we’re unable to cancel an order once it has been
          processed, we offer a Free Returns service. Click here to learn more
          Further information on cancelling and returning an order can be found
          in our Return & Refunds Policy.
        </p>
        <h5>CUSTOMIZED ITEMS</h5>
        <p>
          We hope you’re excited to order your customized item! Due to the
          nature of this order, manufacturing lead times may vary as it is
          created specifically for you.
        </p>
        <div>
          <p style={{ textDecoration: "underline" }}>
            <b>Please Note:</b>
          </p>
          although customized items have a longer lead time, payment will be
          taken shortly after you place your order and there no refund for
          customized items there for your order will be taken carefully
        </div>
      </div>
    </div>
  );
}

export default dynamic(async () => await Shipping, { ssr: false });

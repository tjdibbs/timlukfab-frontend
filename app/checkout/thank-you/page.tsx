import axios from "axios";
import ThankYou from "./ThankYou";
import { BASE_URL } from "@lib/constants";

export default async function Page({
  searchParams,
}: {
  searchParams: { orderId?: string; token?: string };
}) {
  try {
    if (!searchParams.orderId) {
      return <ThankYou order={null} />;
    }
    const reqOrder = await axios.get(
      BASE_URL + "/api/order/" + searchParams.orderId
    );

    const {
      success,
      orders: [order],
    } = await reqOrder.data;

    return (
      <ThankYou
        order={{
          ...order,
          cart: JSON.parse(order.cart),
        }}
        token={searchParams.token}
      />
    );
  } catch (error) {
    return <ThankYou order={null} message="Error fetching order" />;
  }
}

import OrderForm from "@/components/checkout/order-form";
import OrderSummary from "@/components/checkout/order-summary";

export default function Page() {
  return (
    <section>
      <div className="wrapper gap-8 max-lg:space-y-8 lg:grid lg:grid-cols-12">
        <OrderForm />
        <OrderSummary />
      </div>
    </section>
  );
}

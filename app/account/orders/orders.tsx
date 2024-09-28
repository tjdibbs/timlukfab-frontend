"use client";

import { useGetAllOrdersQuery } from "@/lib/redux/services/orders";
import { useAppSelector } from "@/lib/redux/store";
import Link from "next/link";
import { Fragment, useEffect, useMemo } from "react";
import Order, { OrderSkeleton } from "@/components/orders/order";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import clsx from "clsx";

const FilterSchema = z.enum(["all", "pending", "cancelled", "delivered"]);

const Orders = () => {
  const id = useAppSelector(state => state.auth.id);
  const { data, isLoading, refetch } = useGetAllOrdersQuery(undefined, {
    skip: !id,
  });

  const searchParams = useSearchParams();

  const userOrders = useMemo(() => {
    if (!data) return [];

    if (searchParams.get("filter")) {
      const filter = searchParams.get("filter") as z.infer<typeof FilterSchema>;

      if (!FilterSchema.parse(filter)) {
        return data.orders;
      }

      if (filter === "all") return data.orders;

      return data.orders.filter(order => order.status === filter);
    }

    return data.orders;
  }, [data, searchParams]);

  useEffect(() => {
    if (!id) return;
    refetch();
  }, [id]);

  if (isLoading || !data || !userOrders) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <OrderSkeleton key={index + 1} />
        ))}
      </div>
    );
  }

  if (!userOrders.length) {
    return (
      <Fragment>
        <Filter />
        <div className="mt-6 space-y-4 text-normal_grey">No orders to show</div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Filter />
      <div className="mt-6 space-y-4">
        {userOrders.map(order => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </Fragment>
  );
};

const Filter = () => {
  const searchParams = useSearchParams();

  const filter = useMemo(() => {
    return searchParams.get("filter") as z.infer<typeof FilterSchema>;
  }, [searchParams]);

  return (
    <div className="no-scrollbar flex flex-nowrap items-center gap-2 overflow-x-auto">
      <Link
        href="/account/orders?filter=all"
        className={clsx(
          "rounded-xl border border-[#eee] px-4 py-2 text-center text-sm font-medium capitalize text-[#555] transition-all duration-200 ease-linear hover:bg-[#333333] hover:text-white",
          { "bg-[#333333] text-white": filter === "all" || !filter }
        )}
      >
        All orders
      </Link>
      <Link
        href="/account/orders?filter=pending"
        className={clsx(
          "rounded-xl border border-[#eee] px-4 py-2 text-center text-sm font-medium capitalize text-[#555] transition-all duration-200 ease-linear hover:bg-[#333333] hover:text-white",
          { "bg-[#333333] text-white": filter === "pending" }
        )}
      >
        Pending
      </Link>
      <Link
        href="/account/orders?filter=cancelled"
        className={clsx(
          "rounded-xl border border-[#eee] px-4 py-2 text-center text-sm font-medium capitalize text-[#555] transition-all duration-200 ease-linear hover:bg-[#333333] hover:text-white",
          { "bg-[#333333] text-white": filter === "cancelled" }
        )}
      >
        Cancelled
      </Link>
      <Link
        href="/account/orders?filter=delivered"
        className={clsx(
          "rounded-xl border border-[#eee] px-4 py-2 text-center text-sm font-medium capitalize text-[#555] transition-all duration-200 ease-linear hover:bg-[#333333] hover:text-white",
          { "bg-[#333333] text-white": filter === "delivered" }
        )}
      >
        Delivered
      </Link>
    </div>
  );
};

export default Orders;

"use client";

import { BreadCrumbLink } from "@/lib/types";
import BreadCrumbComponent from "../ui/breadcrumb-component";
import { useGetUserQuery } from "@/lib/redux/services/user";
import { useAppSelector } from "@/lib/redux/store";
import { useEffect } from "react";
import { Separator } from "../ui/separator";
import CheckoutForm from "./form";

const links: BreadCrumbLink[] = [
  {
    id: 1,
    name: "home",
    href: "/",
    isPage: false,
  },
  {
    id: 2,
    name: "checkout",
    href: "/checkout",
    isPage: true,
  },
];

const OrderForm = () => {
  const id = useAppSelector(state => state.auth.id);
  const { data, refetch } = useGetUserQuery(id?.toString() || "", {
    skip: !id,
  });

  useEffect(() => {
    if (!id) return;
    refetch();
  }, [id]);

  return (
    <div className="col-span-7 lg:py-8">
      <BreadCrumbComponent links={links} />
      <div className="mb-4 mt-6 space-y-2">
        <h6 className="font-semibold">Account</h6>
        <p>{data?.email}</p>
      </div>
      <Separator />
      <div className="my-6">
        <CheckoutForm />
      </div>
    </div>
  );
};
export default OrderForm;

"use client";

import { Button } from "@/components/ui/button";
import {
  useDeleteAddressMutation,
  useGetAddressesQuery,
} from "@/lib/redux/services/address";
import { useAppSelector } from "@/lib/redux/store";
import Link from "next/link";
import { Fragment, memo, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlusCircle } from "lucide-react";
import { AddressController } from "@/types/addresses";
import { TailwindSpinner } from "@/components/ui/spinner";
import useMessage from "@/hooks/useMessage";
import { ErrorResponse } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

const Addresses = () => {
  const id = useAppSelector(state => state.auth.id);
  const { data, refetch } = useGetAddressesQuery({}, { skip: !id });

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  if (!data?.length) {
    return (
      <div>
        <p className="text-normal_grey">You have not added any addresses</p>
        <Button className="mt-6">
          <Link
            href="/account/addresses/new"
            className="text-white hover:text-blue-400"
          >
            Add Address
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <Accordion type="single" collapsible>
        {data?.map((address, index) => (
          <AccordionItem value={address.streetAddress} key={address.id}>
            <AccordionTrigger>
              <div className="flex items-center gap-2 text-base">
                <span>Address {index + 1}</span>{" "}
                {address.isDefault && (
                  <Badge variant={"outline"}>Default</Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-base">
              <AddressItem address={address} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Button className="mt-8">
        <Link
          href={"/account/addresses/new"}
          className="flex items-center gap-2 text-white hover:text-blue-500"
        >
          Add Address <PlusCircle size={16} />
        </Link>
      </Button>
    </div>
  );
};

const AddressItem = memo(
  ({ address }: { address: AddressController.Address }) => {
    const [deleteAddress, { isLoading }] = useDeleteAddressMutation();

    const { alertMessage } = useMessage();

    const handleDelete = async () => {
      try {
        await deleteAddress(address.id.toString()).unwrap();
        alertMessage("Address deleted successfully", "success");
      } catch (error) {
        if (error instanceof Error) {
          alertMessage(error.message, "error");
        } else {
          const message = (error as ErrorResponse).data.message;
          alertMessage(message || "an error ocurred", "error");
        }
      }
    };

    return (
      <Fragment>
        <Link
          href={`/account/addresses/${address.id}/edit`}
          className="text-gray-500 hover:underline"
        >
          Edit
        </Link>

        <p className="italic">{address.city}</p>
        <p className="italic">{address.state}</p>
        <p className="italic">{address.country}</p>
        <p className="italic">{address.streetAddress}</p>
        {isLoading ? (
          <TailwindSpinner className="h-4 w-4" />
        ) : (
          <button className="mt-1 text-red-500" onClick={handleDelete}>
            Delete
          </button>
        )}
      </Fragment>
    );
  }
);

AddressItem.displayName = "AddressItem";
export default Addresses;

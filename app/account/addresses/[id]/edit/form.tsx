"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TailwindSpinner } from "@/components/ui/spinner";
import useMessage from "@/hooks/useMessage";
import { countryList } from "@/lib/country";
import { useUpdateAddressMutation } from "@/lib/redux/services/address";
import { AddAddressSchema } from "@/lib/schemas";
import { ErrorResponse } from "@/lib/types";
import { AddressController } from "@/types/addresses";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "nextjs-toploader/app";
import { z } from "zod";

type FormSchema = z.infer<typeof AddAddressSchema>;

const EditForm = ({ address }: { address: AddressController.Address }) => {
  const { id } = useParams() as { id: string };

  const form = useForm<FormSchema>({
    resolver: zodResolver(AddAddressSchema),
    defaultValues: {
      city: address.city,
      country: address.country,
      phoneNumber: "",
      postalCode: address.postalCode,
      state: address.state,
      streetAddress: address.streetAddress,
      isDefault: address.isDefault,
    },
  });

  const [updateAddress, { isLoading }] = useUpdateAddressMutation();

  const { alertMessage } = useMessage();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormSchema> = async data => {
    try {
      await updateAddress({ address: data, addressId: id }).unwrap();
      alertMessage("Address updated successfully", "success");
      form.reset();
      router.push("/account/addresses");
    } catch (error) {
      if (error instanceof Error) {
        alertMessage(error.message, "error");
        return;
      }
      const message = (error as ErrorResponse).data.message;
      alertMessage(message || "An error occurred", "error");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-3xl space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="Your state" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Your city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={value => field.onChange(value)}
                >
                  <FormControl>
                    <SelectTrigger className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-black">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countryList.map(country => (
                      <SelectItem key={country.code} value={country.name}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input placeholder="Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal code</FormLabel>
                <FormControl>
                  <Input placeholder="Postal code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="streetAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input placeholder="Street Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isDefault"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Set as default address</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button disabled={isLoading} type="submit" className="max-lg:w-full">
            {isLoading ? <TailwindSpinner className="h-4 w-4" /> : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default EditForm;

"use client";

import { VerifyEmailSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type FormSchema = z.infer<typeof VerifyEmailSchema>;

const VerifyEmail = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(VerifyEmailSchema),
  });

  function onSubmit(values: FormSchema) {
    console.log(values);
  }

  return (
    <section>
      <div className="wrapper py-16">
        <h4 className="mb-2 text-center text-xl font-semibold">
          Verify your email
        </h4>
        <p className="mb-8 text-center">Enter the code sent to your email</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto max-w-md space-y-6"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="mx-auto">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="text-center text-gray-700">
                    Did not get the code?{" "}
                    <button className="text-blue-500">Resend Code</button>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mx-auto block w-[80%] max-w-52">
              Verify
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};
export default VerifyEmail;

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
import useVerifyEmail from "@/hooks/useVerifyEmail";
import {
  useSendVerificationCodeMutation,
  useVerifyUserMutation,
} from "@/lib/redux/services/auth";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { ErrorResponse, User } from "@/lib/types";
import useMessage from "@/hooks/useMessage";
import Spinner from "@/components/ui/spinner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { setUser } from "@/lib/redux/features/user";

type FormSchema = z.infer<typeof VerifyEmailSchema>;

const VerifyEmail = () => {
  const { seconds, enableResend, resetResend } = useVerifyEmail();
  const userId = Cookies.get("email-verification");
  const dispatch = useAppDispatch();

  const [sendCode, { isLoading }] = useSendVerificationCodeMutation();
  const [verifyUser, { isLoading: isVerifying }] = useVerifyUserMutation();

  const { alertMessage } = useMessage();
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(VerifyEmailSchema),
  });

  async function onSubmit({ pin }: FormSchema) {
    if (!userId) return;
    try {
      const response = await verifyUser({
        code: pin,
        userId: Number(userId),
      }).unwrap();
      const result = response as { user: User; message: string };
      alertMessage(result.message || "Email verified successfully", "success");
      Cookies.remove("email-verification");
      dispatch(setUser(result.user));
      router.replace("/verified");
    } catch (error) {
      const errorData = (error as ErrorResponse)?.data?.message;
      alertMessage(errorData || "An error occurred", "error");
    }
  }

  async function handleResendCode() {
    if (!userId || !enableResend) return;

    try {
      const response = await sendCode(Number(userId)).unwrap();
      resetResend();
      alertMessage("Verification code sent successfully", "success");
    } catch (error) {
      console.log(error);
      const errorData = (error as ErrorResponse).data.message;
      alertMessage(errorData || "An error occurred", "error");
    }
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
                  <FormDescription className="flex items-center justify-center gap-2 text-center text-gray-700">
                    Did not get the code?{" "}
                    <button
                      disabled={enableResend === false || isLoading}
                      onClick={handleResendCode}
                      className="text-blue-500"
                    >
                      {isLoading ? (
                        <Spinner strokeColor="#000" className="w-2" />
                      ) : (
                        "Resend Code"
                      )}
                    </button>
                    {seconds > 0 && (
                      <span className="ml-1 inline-block text-normal_grey">
                        {seconds}s
                      </span>
                    )}
                  </FormDescription>
                  <FormMessage className="text-center" />
                </FormItem>
              )}
            />

            <Button
              disabled={isVerifying}
              type="submit"
              className="mx-auto block w-[80%] max-w-52"
            >
              {isVerifying ? <Spinner strokeColor="#fff" /> : "Verify"}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};
export default VerifyEmail;

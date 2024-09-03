"use client";

import { CreateSizeSchema } from "@/lib/schemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import { SubmitButton } from "../ui/submit-button";
import { createSize } from "@/lib/actions";
import useMessage from "@/hooks/useMessage";

type FormSchema = z.infer<typeof CreateSizeSchema>;

const CreateForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(CreateSizeSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { alertMessage } = useMessage();

  async function onSubmit(values: FormSchema) {
    try {
      const res = await createSize(values);
      if (res.success) {
        alertMessage("Size created successfully", "success");
      } else {
        alertMessage("Error creating size", "error");
      }
      form.reset();
    } catch (error) {
      alertMessage("Error creating size", "error");
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-xl space-y-8"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="XL" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Extra Large" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <SubmitButton />
        </form>
      </Form>
    </div>
  );
};
export default CreateForm;

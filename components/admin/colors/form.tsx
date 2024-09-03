"use client";

import { CreateColorSchema } from "@/lib/schemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useMessage from "@/hooks/useMessage";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createColor } from "@/lib/actions/colors";

type FormSchema = z.infer<typeof CreateColorSchema>;

const CreateForm = () => {
  const [pending, setPending] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(CreateColorSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const colorValue = form.watch("hexCode");

  const { alertMessage } = useMessage();

  async function onSubmit(values: FormSchema) {
    setPending(true);
    const res = await createColor(values);
    if (res.success) {
      alertMessage(res.message, "success");
    } else {
      alertMessage(res.message, "error");
    }
    setPending(false);
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
                    <Input placeholder="black" {...field} />
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
                    <Input placeholder="Black Color" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="hexCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hex Code</FormLabel>
                  <FormControl>
                    <Input placeholder="#000000" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-end">
              <div
                className="h-8 w-8 rounded-full bg-black"
                style={{ backgroundColor: colorValue }}
              ></div>
            </div>
          </div>
          <Button type="submit" disabled={pending}>
            {pending ? (
              <Loader2Icon className="h-4 w-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default CreateForm;

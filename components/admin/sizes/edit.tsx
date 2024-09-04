"use client";

import Modal from "@/components/admin/ui/modal";
import { CreateSizeSchema } from "@/lib/schemas";
import { SizesController } from "@/types/sizes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { updateSize } from "@/lib/actions/sizes";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  size: SizesController.Size;
};

type FormSchema = z.infer<typeof CreateSizeSchema>;
const EditForm = ({ open, setOpen, size }: Props) => {
  const [pending, setPending] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(CreateSizeSchema),
    defaultValues: {
      name: size.name,
      description: size.description,
    },
  });

  const { alertMessage } = useMessage();

  async function onSubmit(values: FormSchema) {
    setPending(true);
    const res = await updateSize(size.id.toString(), values);
    if (res.success) {
      alertMessage(res.message, "success");
    } else {
      alertMessage(res.message, "error");
    }
    setPending(false);
  }

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Edit Size"
      description="Edit the size"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name<span className="text-lg text-red-600">*</span>
                </FormLabel>
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
                <FormLabel>
                  Description<span className="text-lg text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Extra Large" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={pending}>
            {pending ? (
              <Loader2Icon className="h-4 w-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </Modal>
  );
};
export default EditForm;

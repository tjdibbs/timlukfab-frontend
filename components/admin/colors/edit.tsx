"use client";

import Modal from "@/components/admin/ui/modal";
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
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { updateColor } from "@/lib/actions/colors";
import { ColorsController } from "@/types/colors";
import { CreateColorSchema } from "@/lib/schemas";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  color: ColorsController.Color;
};

type FormSchema = z.infer<typeof CreateColorSchema>;
const EditForm = ({ open, setOpen, color }: Props) => {
  const [pending, setPending] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(CreateColorSchema),
    defaultValues: {
      name: color.name,
      description: color.description,
      hexCode: color.hexCode,
    },
  });

  const colorValue = form.watch("hexCode");

  const { alertMessage } = useMessage();

  async function onSubmit(values: FormSchema) {
    setPending(true);
    const res = await updateColor(color.id.toString(), values);
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
      title="Edit Color"
      description="Edit the color"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  <Input placeholder="#000000" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2">
            <div className="flex-1">
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
            </div>
            <div
              className="h-5 w-5 rounded-full"
              style={{ backgroundColor: colorValue }}
            ></div>
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
    </Modal>
  );
};
export default EditForm;

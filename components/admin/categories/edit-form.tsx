"use client";

import { CreateCategorySchema } from "@/lib/schemas";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import useMessage from "@/hooks/useMessage";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileController } from "@/types/files";
import Image from "next/image";
import { createCategory, updateCategory } from "@/lib/actions/categories";
import { CategoryController } from "@/types/categories";
import { useRouter } from "next/navigation";

type Props = {
  category: CategoryController.Category;
  images: FileController.File[];
  id: string;
};

type FormSchema = z.infer<typeof CreateCategorySchema>;

const EditForm = ({ images, category, id }: Props) => {
  const [pending, setPending] = useState(false);

  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      name: category.name,
      description: category.description || "",
      imageId: category.imageId ? category.imageId.toString() : "",
      bannerId: category.bannerId ? category.bannerId.toString() : "",
    },
  });

  const { alertMessage } = useMessage();

  async function onSubmit(values: FormSchema) {
    setPending(true);
    const res = await updateCategory(id, values);
    if (res.success) {
      alertMessage(res.message, "success");
      router.push("/admin/categories");
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name<span className="text-lg text-red-600">*</span>{" "}
                </FormLabel>
                <FormControl>
                  <Input placeholder="Men's wears" {...field} />
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
                  <Textarea
                    placeholder="Optional description"
                    rows={5}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Image<span className="text-lg text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                    disabled={images.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={`${images.length ? "Select category image" : "No images available"}`}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {images.map(image => (
                        <SelectItem key={image.id} value={image.id.toString()}>
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded shadow">
                              <Image
                                src={image.path}
                                alt={image.originalName}
                                height={50}
                                width={50}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span>{image.originalName}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bannerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banner</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                    disabled={images.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={`${images.length ? "Select banner image" : "No images available"}`}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {images.map(image => (
                        <SelectItem key={image.id} value={image.id.toString()}>
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded shadow">
                              <Image
                                src={image.path}
                                alt={image.originalName}
                                height={50}
                                width={50}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span>{image.originalName}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
    </div>
  );
};
export default EditForm;

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
import { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileController } from "@/types/files";
import Image from "next/image";
import { createCategory } from "@/lib/actions/categories";

type Props = {
  images: FileController.File[];
  hasMore: boolean;
};

type FormSchema = z.infer<typeof CreateCategorySchema>;

const getFiles = async (pageNumber: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/files?pageNumber=${pageNumber}`,
    {
      next: { revalidate: 300 },
    }
  );
  const data = await res.json();
  return data as FileController.Get;
};

const CreateForm = ({ images, hasMore }: Props) => {
  const [pending, setPending] = useState(false);
  const [itHasMore, setItHasmore] = useState(hasMore);
  const [allFiles, setAllFiles] = useState(images);

  const form = useForm<FormSchema>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      imageId: "",
      bannerId: "",
    },
  });

  const { alertMessage } = useMessage();

  async function onSubmit(values: FormSchema) {
    setPending(true);
    const res = await createCategory(values);
    if (res.success) {
      alertMessage(res.message, "success");
    } else {
      alertMessage(res.message, "error");
    }
    console.log(values);
    setPending(false);
  }

  useEffect(() => {
    let pageNumber = 2;
    const fetchOtherPages = async () => {
      const {
        result: { files, hasMore },
      } = await getFiles(pageNumber);

      setItHasmore(hasMore);
      setAllFiles([...allFiles, ...files]);
      pageNumber++;
    };

    if (itHasMore) {
      (async () => {
        await fetchOtherPages();
      })();
    }
  }, [itHasMore]);

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
                    disabled={allFiles.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={`${allFiles.length ? "Select category image" : "No images available"}`}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {allFiles.map(image => (
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
                    disabled={allFiles.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={`${allFiles.length ? "Select banner image" : "No images available"}`}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {allFiles.map(image => (
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
export default CreateForm;

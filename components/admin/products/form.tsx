"use client";

import { CreateProductSchema } from "@/lib/schemas";
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
import { SubmitButton } from "../ui/submit-button";
import useMessage from "@/hooks/useMessage";
import { Fragment, useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColorsController } from "@/types/colors";
import { SizesController } from "@/types/sizes";
import { FileController } from "@/types/files";
import { CategoryController } from "@/types/categories";
import { SubCategoryController } from "@/types/sub-categories";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { createProduct } from "@/lib/actions/products";
import clsx from "clsx";

type Props = {
  colors: ColorsController.Color[];
  sizes: SizesController.Size[];
  categories: CategoryController.Category[];
  images: FileController.File[];
  imagesHasMore: boolean;
};

type FormSchema = z.infer<typeof CreateProductSchema>;

const getFiles = async (pageNumber: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/files?pageNumber=${pageNumber}`,
    {
      next: { tags: ["Files"] },
    }
  );
  const data = await res.json();
  return data as FileController.Get;
};

const CreateForm = ({
  colors,
  sizes,
  categories,
  images,
  imagesHasMore,
}: Props) => {
  const [pending, setPending] = useState(false);
  const [itHasMore, setItHasmore] = useState(imagesHasMore);
  const [allFiles, setAllFiles] = useState(images);
  const [subcategories, setSubcategories] = useState<
    CategoryController.SubCategory[]
  >([]);

  const form = useForm<FormSchema>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: undefined,
      stock: undefined,
      medias: [],
      colors: [],
      sizes: [],
      categories: [],
      subcategories: [],
    },
  });

  const colorValues = form.watch("colors");
  const sizeValues = form.watch("sizes");
  const mediaValues = form.watch("medias");

  const { alertMessage } = useMessage();

  async function onSubmit(values: FormSchema) {
    setPending(true);
    const res = await createProduct(values);
    if (res.success) {
      alertMessage(res.message, "success");
    } else {
      alertMessage(res.message, "error");
    }
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
          className="mx-auto max-w-2xl space-y-8"
        >
          <div className="space-y-8">
            <FormLabel className="text-lg font-bold">
              Product Information
            </FormLabel>
            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name<span className="text-lg text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Black dress" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Price<span className="text-lg text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="100"
                        type="number"
                        {...field}
                        onChange={e => {
                          const value = Number(e.target.value);
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Stock<span className="text-lg text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="100"
                        {...field}
                        onChange={e => {
                          const value = Number(e.target.value);
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description<span className="text-lg text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    placeholder="Product description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          <div className="space-y-8">
            <FormLabel className="text-lg font-bold">
              Categories and Subcategories
            </FormLabel>
            <div>
              <FormLabel>
                Select Category<span className="text-lg text-red-600">*</span>
              </FormLabel>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {categories.map(category => (
                  <FormField
                    key={category.id}
                    control={form.control}
                    name="categories"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={category.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(category.id)}
                              onCheckedChange={checked => {
                                if (checked) {
                                  const exists = subcategories.some(
                                    c => c.categoryId === category.id
                                  );
                                  if (!exists) {
                                    const cat = (categories.find(
                                      c => c.id === category.id
                                    ) || []) as CategoryController.Category;
                                    const catSubs = cat.subcategories;
                                    const copied = [...subcategories];
                                    setSubcategories([...copied, ...catSubs]);
                                  }
                                } else {
                                  const exists = subcategories.some(
                                    c => c.categoryId === category.id
                                  );
                                  if (exists) {
                                    const filtered = subcategories.filter(
                                      c => c.categoryId !== category.id
                                    );
                                    setSubcategories(filtered);
                                  }
                                }

                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      category.id,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        value => value !== category.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {category.name}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </div>
            </div>

            {subcategories.length > 0 && (
              <Fragment>
                <Separator />
                <div>
                  <FormLabel>
                    Select Subcategory
                    <span className="text-lg text-red-600">*</span>
                  </FormLabel>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {subcategories.map(category => (
                      <FormField
                        key={category.id}
                        control={form.control}
                        name="subcategories"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={category.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(category.id)}
                                  onCheckedChange={checked => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          category.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            value => value !== category.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {category.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </div>
              </Fragment>
            )}
          </div>

          <Separator />

          <div className="space-y-8">
            <FormLabel
              className={clsx("block text-lg font-bold", {
                "text-red-500": !!form.formState.errors.colors,
              })}
            >
              Colors*
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"}>Click to choose colors</Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="grid grid-cols-2 gap-2">
                  {colors.map(color => (
                    <FormField
                      key={color.id}
                      control={form.control}
                      name="colors"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.some(
                                val => val.id === color.id
                              )}
                              onCheckedChange={checked => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      {
                                        id: color.id,
                                        stock: undefined,
                                        additionalPrice: undefined,
                                      },
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        value => value.id !== color.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {color.name}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <div className="space-y-4">
              {colorValues?.map((value, index) => {
                const color = colors.find(color => color.id === value.id);

                return (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="text-sm">{color?.name}</div>{" "}
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: color?.hexCode }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <FormField
                        control={form.control}
                        name={`colors.${index}.stock` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stock</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="10"
                                type="number"
                                {...field}
                                onChange={e => {
                                  const value = Number(e.target.value);
                                  field.onChange(value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`colors.${index}.additionalPrice` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional price</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="20"
                                type="number"
                                {...field}
                                onChange={e => {
                                  const value = Number(e.target.value);
                                  field.onChange(value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            {!!form.formState.errors.colors && (
              <p className="text-xs text-red-500">
                {form.formState.errors.colors.message}
              </p>
            )}
          </div>

          <Separator />

          <div className="space-y-8">
            <FormLabel
              className={clsx("block text-lg font-bold", {
                "text-red-500": !!form.formState.errors.sizes,
              })}
            >
              Sizes*
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"}>Click to choose sizes</Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="grid grid-cols-2 gap-2">
                  {sizes.map(size => (
                    <FormField
                      key={size.id}
                      control={form.control}
                      name="sizes"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.some(
                                val => val.id === size.id
                              )}
                              onCheckedChange={checked => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      {
                                        id: size.id,
                                        stock: undefined,
                                        additionalPrice: undefined,
                                      },
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        value => value.id !== size.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {size.name}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <div className="space-y-4">
              {sizeValues?.map((value, index) => {
                const size = sizes.find(size => size.id === value.id);

                return (
                  <div className="space-y-4">
                    <div className="text-sm">
                      {size?.name} ({size?.description})
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <FormField
                        control={form.control}
                        name={`sizes.${index}.stock` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stock</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="10"
                                type="number"
                                {...field}
                                onChange={e => {
                                  const value = Number(e.target.value);
                                  field.onChange(value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`sizes.${index}.additionalPrice` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional price</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="20"
                                type="number"
                                {...field}
                                onChange={e => {
                                  const value = Number(e.target.value);
                                  field.onChange(value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            {!!form.formState.errors.sizes && (
              <p className="text-xs text-red-500">
                {form.formState.errors.sizes.message}
              </p>
            )}
          </div>

          <Separator />

          <div className="space-y-8">
            <FormLabel
              className={clsx("block text-lg font-bold", {
                "text-red-500": !!form.formState.errors.medias,
              })}
            >
              Images*
            </FormLabel>
            <div className="flex flex-wrap items-center gap-1">
              {mediaValues.map(value => {
                const image = allFiles.find(img => img.id === value);

                if (!image) {
                  return null;
                }

                return (
                  <div className="h-24 w-24 overflow-hidden rounded shadow-sm">
                    <Image
                      src={image.path}
                      alt={image.originalName}
                      className="h-full w-full object-cover"
                      width={100}
                      height={100}
                    />
                  </div>
                );
              })}
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"}>Click to choose images</Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="grid h-64 grid-cols-3 gap-1 overflow-y-auto">
                  {allFiles.map(image => (
                    <FormField
                      key={image.id}
                      control={form.control}
                      name="medias"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Checkbox
                              style={{ display: "none" }}
                              checked={field.value?.includes(image.id)}
                              onCheckedChange={checked =>
                                checked
                                  ? field.onChange([...field.value, image.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        val => val !== image.id
                                      )
                                    )
                              }
                            />
                          </FormControl>
                          <FormLabel>
                            <div
                              className={`h-24 cursor-pointer overflow-hidden rounded border transition-opacity hover:opacity-60 ${field.value?.includes(image.id) ? "border-black opacity-60" : "border-transparent"}`}
                            >
                              <Image
                                src={image.path}
                                alt={image.originalName}
                                className="h-full w-full object-cover"
                                width={100}
                                height={100}
                              />
                            </div>
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            {!!form.formState.errors.medias && (
              <p className="text-xs text-red-500">
                {form.formState.errors.medias.message}
              </p>
            )}
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

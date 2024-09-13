import { getFiles } from "@/lib/actions/files";
import { getProducts, getSingleProduct } from "@/lib/actions/products";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Flag,
  Star,
  Pencil,
  ChevronLeft,
  Package,
  ImageIcon,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

export const generateStaticParams = async () => {
  const {
    result: { products },
  } = await getProducts();

  return products.map(product => ({
    id: product.id.toString(),
  }));
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    notFound();
  }

  const {
    result: { files },
  } = await getFiles();

  const { product } = await getSingleProduct(id);

  const mockReviews = [
    {
      id: 1,
      user: "John Doe",
      rating: 5,
      comment: "Great product!",
      date: "2023-04-01",
      flagged: false,
    },
    {
      id: 2,
      user: "Jane Smith",
      rating: 4,
      comment: "Good quality, but a bit pricey.",
      date: "2023-03-28",
      flagged: true,
    },
    {
      id: 3,
      user: "Mike Johnson",
      rating: 3,
      comment: "Average product, nothing special.",
      date: "2023-03-25",
      flagged: false,
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="wrapper">
        <div className="mb-8">
          <Link
            href="/admin/products"
            className="mb-2 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Products
          </Link>
        </div>
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <Button variant="outline">
            <Link
              href={`/admin/products/${id}/edit`}
              className="flex items-center"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit Product
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1">
            <TabsTrigger value="details">
              <Package className="mr-2 inline h-4 w-4" />
              Details
            </TabsTrigger>
            <TabsTrigger value="variants">
              <Package className="mr-2 inline h-4 w-4" />
              Variants
            </TabsTrigger>
            <TabsTrigger value="media">
              <ImageIcon className="mr-2 inline h-4 w-4" />
              Media
            </TabsTrigger>
            <TabsTrigger value="reviews">
              <MessageSquare className="mr-2 inline h-4 w-4" />
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm uppercase text-gray-500">
                  Product Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 text-lg font-semibold text-gray-900">
                        Description
                      </h3>
                      <p className="text-gray-700">{product.description}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="rounded-lg bg-green-50 p-4">
                        <h4 className="text-sm font-medium text-green-800">
                          Price
                        </h4>
                        <p className="text-2xl font-bold text-green-600">
                          ${product.price}
                        </p>
                      </div>
                      <div className="rounded-lg bg-red-50 p-4">
                        <h4 className="text-sm font-medium text-red-800">
                          Discount
                        </h4>
                        <p className="text-2xl font-bold text-red-600">
                          ${product.discount}
                        </p>
                      </div>
                      <div className="rounded-lg bg-blue-50 p-4">
                        <h4 className="text-sm font-medium text-blue-800">
                          Stock
                        </h4>
                        <p className="text-2xl font-bold text-blue-600">
                          {product.stock}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 text-lg font-semibold text-gray-900">
                        Categories
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {product.categories.map(category => (
                          <Badge
                            key={category.id}
                            variant="secondary"
                            className="text-sm"
                          >
                            {category.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold text-gray-900">
                        Subcategories
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {product.subcategories.map(subcategory => (
                          <Badge
                            key={subcategory.id}
                            variant="outline"
                            className="text-sm"
                          >
                            {subcategory.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="variants">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm uppercase text-gray-500">
                  Product Variants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="mb-4 text-xl font-semibold">Colors</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {product.colors.map(color => (
                        <div
                          key={color.id}
                          className="flex items-center space-x-3 rounded-lg bg-white p-3 shadow"
                        >
                          <div
                            className="h-8 w-8 rounded-full border"
                            style={{ backgroundColor: color.hexCode }}
                          ></div>
                          <div>
                            <p className="font-medium">{color.name}</p>
                            <p className="text-sm text-gray-500">
                              Stock: {color.ProductColor.stock} | +$
                              {color.ProductColor.additionalPrice}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-4 text-xl font-semibold">Sizes</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {product.sizes.map(size => (
                        <div
                          key={size.id}
                          className="rounded-lg bg-white p-3 shadow"
                        >
                          <p className="font-medium">{size.name}</p>
                          <p className="text-sm text-gray-500">
                            Stock: {size.ProductSize.stock} | +$
                            {size.ProductSize.additionalPrice}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm uppercase text-gray-500">
                  Product Media
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {product.medias.map(media => (
                    <div
                      key={media.id}
                      className="group relative aspect-square"
                    >
                      <Image
                        src={media.path}
                        alt={"Product Media"}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg transition-opacity group-hover:opacity-75"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                        <Button variant="secondary" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm uppercase text-gray-500">
                  Product Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockReviews.map(review => (
                    <div
                      key={review.id}
                      className="rounded-lg bg-white p-4 shadow"
                    >
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <p className="font-semibold">{review.user}</p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                                fill="currentColor"
                              />
                            ))}
                          </div>
                        </div>
                        <Button
                          variant={review.flagged ? "destructive" : "ghost"}
                          size="sm"
                        >
                          <Flag className="mr-2 h-4 w-4" />
                          {review.flagged ? "Flagged" : "Flag"}
                        </Button>
                      </div>
                      <p className="mb-2 text-gray-600">{review.comment}</p>
                      <p className="text-sm text-gray-400">{review.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

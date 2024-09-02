import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { products, Product } from "@/data/index";
import Image from "next/image";

export default function Page() {
  return (
    <section className="min-h-screen bg-gray-50">
      <div className="wrapper py-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-3xl font-extrabold">Products</h3>
          <Button>Add Product</Button>
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  ID
                </TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Name
                </TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Price
                </TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Image
                </TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200 bg-white">
              {products.map((product: Product) => (
                <TableRow key={product.id}>
                  <TableCell className="whitespace-nowrap px-6 py-4">
                    {product.id}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-6 py-4">
                    {product.name}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-6 py-4">
                    ${product.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-6 py-4">
                    <Image
                      src={product.image as string}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="rounded object-cover"
                    />
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-6 py-4">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="ml-2">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { orders, Order } from "@/data/index";
import { products, Product } from "@/data/index";

export default function OrderPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const order: Order | undefined = orders.find(
    (order) => order.id === Number(id),
  );

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="wrapper py-8">
        <h3 className="mb-6 text-3xl font-extrabold">Order Details</h3>
        <Card className="mb-6">
          <CardHeader>
            <h4 className="text-xl font-semibold">Order Information</h4>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Customer Name:</strong> {order.customerName}
            </p>
            <p>
              <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h4 className="text-xl font-semibold">Products in Order</h4>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="min-w-full divide-y divide-gray-200">
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Product ID
                    </TableCell>
                    <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Name
                    </TableCell>
                    <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Price
                    </TableCell>
                    <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Quantity
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
                        1
                      </TableCell>{" "}
                      {/* Assuming quantity is 1 for simplicity */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <div className="mt-6">
          <Button variant="outline" onClick={() => router.back()}>
            Back to Orders
          </Button>
        </div>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { orders, Order } from "@/data";

export default function Page() {
  return (
    <section className="min-h-screen bg-gray-50">
      <div className="wrapper py-8">
        <h3 className="mb-6 text-3xl font-extrabold">Orders</h3>
        <div className="overflow-x-auto">
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Order ID
                </TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Customer Name
                </TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Total Amount
                </TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200 bg-white">
              {orders.map((order: Order) => (
                <TableRow key={order.id}>
                  <TableCell className="whitespace-nowrap px-6 py-4">
                    {order.id}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-6 py-4">
                    {order.customerName}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-6 py-4">
                    ${order.totalAmount.toFixed(2)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-6 py-4">
                    {order.status}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-6 py-4">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="ml-2">
                      Edit
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

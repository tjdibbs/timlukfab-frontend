import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { customers } from "@/data";

export default function CustomersPage() {
  return (
    <section className="min-h-screen bg-gray-50">
      <div className="wrapper py-8">
        <h3 className="mb-6 text-3xl font-extrabold">Customers</h3>
        <div className="overflow-x-auto">
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Customer ID
                </TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Full Name
                </TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Email
                </TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Country
                </TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200 bg-white">
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="whitespace-nowrap px-6 py-4">
                    {customer.id}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-6 py-4">
                    {customer.fullName}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-6 py-4">
                    {customer.email}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-6 py-4">
                    {customer.country}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-6 py-4">
                    <Button variant="outline" size="sm">
                      View
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

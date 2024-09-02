import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { categories, Category } from "@/data/index";

export default function CategoriesPage() {
  return (
    <section className="min-h-screen bg-gray-50">
      <div className="wrapper py-8">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-3xl font-extrabold">Categories</h3>
          <Button>Add New Category</Button>
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Category ID
                </TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Category Name
                </TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Subcategories
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200 bg-white">
              {categories.map((category: Category) => (
                <TableRow key={category.id}>
                  <TableCell className="whitespace-nowrap px-6 py-4">
                    {category.id}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-6 py-4">
                    {category.name}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-6 py-4">
                    {category.subcategories.join(", ")}
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

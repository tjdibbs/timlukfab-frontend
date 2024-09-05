import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const TableSkeletonLoader = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Array(columns)
                .fill(0)
                .map((_, index) => (
                  <TableHead key={index}>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(rows)
              .fill(0)
              .map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array(columns)
                    .fill(0)
                    .map((_, colIndex) => (
                      <TableCell key={colIndex}>
                        <Skeleton className="h-4 w-[100px]" />
                      </TableCell>
                    ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TableSkeletonLoader;

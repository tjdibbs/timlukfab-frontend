import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { getProducts } from "@/lib/actions/products";
import { getUsers } from "@/lib/actions/users";
import {
  BarChart,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface StatCardProps {
  title: string;
  value: string;
  icon: JSX.Element;
}

const Dashboard = async () => {
  const {
    users: { count },
  } = await getUsers();
  const {
    result: { count: productCount, products },
  } = await getProducts();

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Sales"
          value="$24,560"
          icon={<DollarSign className="h-8 w-8" />}
        />
        <StatCard
          title="New Orders"
          value="45"
          icon={<ShoppingCart className="h-8 w-8" />}
        />
        <StatCard
          title="Users"
          value={count.toString()}
          icon={<Users className="h-8 w-8" />}
        />
        <StatCard
          title="Products"
          value={productCount.toString()}
          icon={<Package className="h-8 w-8" />}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h4 className="text-xl font-semibold">Recent Orders</h4>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Recent order details go here...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h4 className="text-xl font-semibold">Top Products</h4>
          </CardHeader>
          <CardContent className="space-y-6">
            {products.slice(0, 4).map(product => (
              <Link
                href={`/admin/products/${product.id}`}
                key={product.id}
                className="flex items-center gap-2"
              >
                <div className="h-10 w-10 rounded">
                  <Image
                    src={product.medias[0].path}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p>{product.name}</p>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-end">
        <Button>Generate Report</Button>
      </div>
    </div>
  );
};

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center p-6">
        <div className="mr-4 rounded-full bg-blue-100 p-3">{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default Dashboard;

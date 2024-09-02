import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Users, ShoppingCart, DollarSign } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: JSX.Element;
}

export default function Page() {
  return (
    <section className="min-h-screen bg-gray-50">
      <div className="wrapper py-8">
        <h3 className="mb-6 text-3xl font-extrabold">Dashboard</h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Sales"
            value="$24,560"
            icon={<DollarSign className="h-8 w-8" />}
          />
          <StatCard
            title="New Orders"
            value="45"
            icon={<ShoppingCart className="h-8 w-8" />}
          />
          <StatCard
            title="New Users"
            value="120"
            icon={<Users className="h-8 w-8" />}
          />
          <StatCard
            title="Conversion Rate"
            value="3.2%"
            icon={<BarChart className="h-8 w-8" />}
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
            <CardContent>
              <p className="text-gray-500">Top product details go here...</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-end">
          <Button>Generate Report</Button>
        </div>
      </div>
    </section>
  );
}

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

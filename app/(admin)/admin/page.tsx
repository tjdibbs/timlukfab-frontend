import Dashboard from "@/components/admin/dashboard/dashboard";
import DashboardSkeletonLoader from "@/components/admin/ui/dashboard-skeleton";
import { Suspense } from "react";

export default async function Page() {
  return (
    <section className="min-h-screen bg-gray-50">
      <div className="wrapper py-8">
        <div className="mb-6">
          <h3 className="mb-1 text-3xl font-extrabold">Dashboard</h3>
          <p className="text-sm text-gray-500">Overview of your store</p>
        </div>

        <Suspense fallback={<DashboardSkeletonLoader />}>
          <Dashboard />
        </Suspense>
      </div>
    </section>
  );
}

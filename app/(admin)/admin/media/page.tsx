import UploadForm from "@/components/admin/media/form";
import { Suspense } from "react";
import Table from "./table";
import TableSkeletonLoader from "@/components/admin/ui/table-skeleton";

export default async function Page() {
  return (
    <section className="min-h-screen bg-gray-50">
      <div className="wrapper py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="mb-1 text-3xl font-extrabold">Images</h3>
            <p className="text-sm text-gray-500">Manage your media</p>
          </div>
          <UploadForm />
        </div>
        <Suspense fallback={<TableSkeletonLoader />}>
          <Table />
        </Suspense>
      </div>
    </section>
  );
}

import CreateForm from "@/components/admin/sizes/form";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <section className="min-h-screen bg-gray-50">
      <div className="wrapper py-8">
        <div className="mb-6">
          <div>
            <h3 className="mb-1 text-3xl font-extrabold">Create Size</h3>
            <p className="text-sm text-gray-500">
              Add a new size to your store
            </p>
          </div>
          <Separator className="my-4" />
        </div>
        <CreateForm />
      </div>
    </section>
  );
}

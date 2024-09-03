import CreateForm from "@/components/admin/colors/form";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <section className="min-h-screen bg-gray-50">
      <div className="wrapper py-8">
        <div className="mb-6">
          <div>
            <h3 className="mb-1 text-3xl font-extrabold">Create Color</h3>
            <p className="text-sm text-gray-500">
              Add a new color to your store
            </p>
          </div>
          <Separator className="my-4" />
        </div>
        <CreateForm />
      </div>
    </section>
  );
}

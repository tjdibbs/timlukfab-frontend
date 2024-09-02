"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { customers } from "@/data";
import { User } from "@/lib/types";

export default function CustomerPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const customer: User | undefined = customers.find(
    (customer) => customer.id === Number(id),
  );

  if (!customer) {
    return <div>Customer not found</div>;
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="wrapper py-8">
        <h3 className="mb-6 text-3xl font-extrabold">Customer Details</h3>
        <Card className="mb-6">
          <CardHeader>
            <h4 className="text-xl font-semibold">Customer Information</h4>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Customer ID:</strong> {customer.id}
            </p>
            <p>
              <strong>Full Name:</strong> {customer.fullName}
            </p>
            <p>
              <strong>Email:</strong> {customer.email}
            </p>
            <p>
              <strong>Country:</strong> {customer.country}
            </p>
            <p>
              <strong>Gender:</strong> {customer.gender}
            </p>
            <p>
              <strong>Verified:</strong> {customer.verified ? "Yes" : "No"}
            </p>
            <p>
              <strong>Contact:</strong> {customer.contact.text}
            </p>
          </CardContent>
        </Card>
        <div className="mt-6">
          <Button variant="outline" onClick={() => router.back()}>
            Back to Customers
          </Button>
        </div>
      </div>
    </section>
  );
}

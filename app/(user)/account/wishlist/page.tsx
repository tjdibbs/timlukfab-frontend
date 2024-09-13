"use client";

import { useGetWishesQuery } from "@/lib/redux/services/wishes";
import DesktopWishlist from "./desktop";
import MobileWishlist from "./mobile";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import useMessage from "@/hooks/useMessage";

export default function Page() {
  const { data, isLoading, isError } = useGetWishesQuery(undefined);

  const { alertMessage } = useMessage();

  useEffect(() => {
    if (isError) {
      alertMessage("Something went wrong", "error");
    }
  }, [isError]);

  if (isLoading || !data) {
    return (
      <div>
        <h4 className="mb-8 text-xl font-semibold text-[#555]">My Wishlist</h4>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index + 1}>
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h4 className="mb-8 text-xl font-semibold text-[#555]">My Wishlist</h4>
      <DesktopWishlist wishlists={data?.result.wishes} />
      <MobileWishlist wishlists={data?.result.wishes} />
    </div>
  );
}

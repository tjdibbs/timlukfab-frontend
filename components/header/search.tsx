"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Search } from "react-feather";
import { AnimatePresence } from "framer-motion";
import { MotionDiv } from "../../lib/motion";
import { Input } from "../ui/input";
import { useGetProductsQuery } from "@/lib/redux/services/product";
import Image from "next/image";
import Link from "next/link";
import { ProductController } from "@/types/products";
import { TailwindSpinner } from "../ui/spinner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchComponent = () => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <Fragment>
      <Button size={"icon"} variant={"ghost"} onClick={() => setOpen(true)}>
        <Search className="w-5 max-md:w-4" />
      </Button>
      <AnimatePresence>
        {open && <SearchModal closeFn={handleClose} />}
      </AnimatePresence>
    </Fragment>
  );
};

const SearchModal = ({ closeFn }: { closeFn: () => void }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data, isFetching } = useGetProductsQuery(
    { searchParam: searchTerm },
    {
      refetchOnMountOrArgChange: true,
      skip: !searchTerm,
    }
  );

  const handleClick = () => {
    if (!searchTerm) return;
    if (pathname !== "/shop") {
      router.push(`/shop?query=${searchTerm}`);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.set("query", searchTerm);
      router.push(`${pathname}?${params.toString()}`);
    }
    closeFn();
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  });

  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] grid h-screen w-full place-items-center bg-black/60"
    >
      <div className="w-[90%] max-w-sm rounded-xl bg-white px-4 py-6">
        <div className="flex items-center gap-1">
          <Input
            placeholder="Search a product..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Button onClick={handleClick}>
            {isFetching ? (
              <TailwindSpinner className="h-4 w-4" />
            ) : (
              <Search className="w-5 max-md:w-4" />
            )}
          </Button>
        </div>
        <div className="mt-6 max-h-52 overflow-y-auto">
          {searchTerm &&
            data?.map((product, index) => (
              <ProductListing
                key={product.id}
                product={product}
                index={index + 1}
              />
            ))}
        </div>
      </div>
    </MotionDiv>
  );
};

const ProductListing = ({
  index,
  product,
}: {
  product: ProductController.Product;
  index: number;
}) => {
  return (
    <div className="flex items-center gap-4 rounded-lg p-4 transition-colors hover:bg-gray-100">
      <div className="flex min-w-[100px] items-center gap-3">
        <span className="font-medium text-gray-500">{index}</span>
        <div className="relative w-16">
          <Image
            src={product.medias[0].path}
            alt={product.name}
            className="aspect-[4/5] w-full object-cover"
            height={100}
            width={100}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <Link
          href={`/products/${product.id}`}
          className="text-sm hover:underline"
        >
          {product.name}
        </Link>
        <div className="mt-2">
          <span className="text-base font-semibold">
            ${parseInt(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;

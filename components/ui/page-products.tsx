"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { ProductController } from "@/types/products";
import { Fragment, useMemo } from "react";
import ProductsComponent from "../ui/products";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";

type Props = {
  data: ProductController.Product[];
  hasMore: boolean;
  count: number;
};

const PageProducts = ({ data, hasMore, count }: Props) => {
  const pageRequiresPagination = useMemo(() => {
    return count > 20 && hasMore;
  }, []);

  return (
    <section className="col-span-9">
      <ProductsComponent
        className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"
        products={data}
      />

      {pageRequiresPagination && <PaginationSection count={count} />}
    </section>
  );
};

const PaginationSection = ({ count }: { count: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const pageNumber = searchParams.get("page");

  const totalPages = Math.ceil(count / 20);

  const pageNumbers: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const maxPageNumberLimit = 5;
  const pageNumLimit = Math.floor(maxPageNumberLimit / 2);

  const activePages = pageNumbers.slice(
    Math.max(0, Number(pageNumber) - 1 - pageNumLimit),
    Math.min(Number(pageNumber) - 1 + pageNumLimit + 1, pageNumbers.length)
  );

  const renderPages = () => {
    const renderedPages = activePages.map(page => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      const newUrl = `${pathname}?${params.toString()}`;
      return (
        <PaginationItem key={page}>
          <PaginationLink
            href={newUrl}
            className={clsx({
              "bg-neutral-100":
                pageNumber === page.toString() || (!pageNumber && page === 1),
            })}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    });

    if (activePages[0] > 1) {
      renderedPages.unshift(<PaginationEllipsis key="ellipsis-start" />);
    }

    if (activePages[activePages.length - 1] < pageNumbers.length) {
      renderedPages.push(<PaginationEllipsis key="ellipsis-end" />);
    }

    return renderedPages;
  };

  const previousPageUrl = () => {
    const params = new URLSearchParams(searchParams.toString());
    const newPageNumber = Math.max(
      1,
      parseInt(pageNumber || "1") - 1
    ).toString();
    params.set("page", newPageNumber);
    return `${pathname}?${params.toString()}`;
  };

  const nextPageUrl = () => {
    const params = new URLSearchParams(searchParams.toString());
    const newPageNumber = Math.min(
      parseInt(pageNumber || "1") + 1,
      totalPages
    ).toString();
    params.set("page", newPageNumber);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="mt-8 grid place-items-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={previousPageUrl()}
              className={clsx({
                "bg-neutral-100": pageNumber === "1" || !pageNumber,
              })}
            />
          </PaginationItem>
          {renderPages()}
          <PaginationItem>
            <PaginationNext
              href={nextPageUrl()}
              className={clsx({
                "bg-neutral-100": pageNumber === totalPages.toString(),
              })}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PageProducts;

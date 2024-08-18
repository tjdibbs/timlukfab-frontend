import React from "react";
import { useRouter } from "next/router";

function useFilterChange<T>(
  setQuery: React.Dispatch<React.SetStateAction<T>>,
  key: string
) {
  const router = useRouter();

  const push = (query: {
    [x: string]: string | string[] | number | undefined;
  }) =>
    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      {
        shallow: true,
      }
    );

  const handleChange = (name: string, checked: boolean) => {
    let query, filterType: string, i: number;
    switch (checked) {
      case true:
        filterType = ((router.query[key] ?? "") as string) + name + ";";

        setQuery(filterType.split(";") as unknown as T);
        push({ ...router.query, [key]: filterType });

        break;
      case false:
        query = ((router.query[key] ?? "") as string).split(";");
        i = query.findIndex((filterType) => filterType === name);

        query.splice(i, 1);
        router.query[key] = query.join(";");

        setQuery(query as unknown as T);
        if (!router.query[key]) delete router.query[key];
        push(router.query);

        break;
    }
  };
  return { handleChange, push };
}

export default useFilterChange;

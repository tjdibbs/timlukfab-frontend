import React from "react";
import {
  Box,
  Card,
  Checkbox,
  Collapse,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useCustomEventListener } from "react-custom-events";
import useFilterChange from "hooks/useFilterChange";

export default function Size(props: { t: { [x: string]: number } }) {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const [queryType, setQueryType] = React.useState(
    ((router.query?.categories ?? "") as string).split(";")
  );

  useCustomEventListener("filterEvent", (data: string) => {
    setOpen((prev) => {
      return prev && data === "categories" ? false : data === "categories";
    });
  });

  const { handleChange } = useFilterChange(setQueryType, "categories");

  return (
    <Collapse className="absolute left-0 z-10 mt-2 top-full w-52" in={open}>
      <div className="card">
        {Object.keys(props.t).map((d, i) => {
          return (
            <Stack key={i} direction={"row"} gap={2} alignItems={"center"}>
              <span className="flex-grow capitalize text-sm font-semibold">
                {d}
              </span>
              <span>{props.t[d]}</span>
              <Checkbox
                size={"small"}
                name={Object.keys(d)[0]}
                checked={queryType.includes(Object.keys(d)[0])}
                onChange={(e) => handleChange(e.target.name, e.target.checked)}
              />
            </Stack>
          );
        })}
      </div>
    </Collapse>
  );
}

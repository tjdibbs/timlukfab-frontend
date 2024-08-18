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

export default function Size(props: { t: { [x: string]: number }[] }) {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const [querySize, setQuerySize] = React.useState(
    ((router.query?.sizes ?? "") as string).split(";")
  );

  useCustomEventListener("filterEvent", (data: string) => {
    setOpen((prev) => {
      return prev && data === "sizes" ? false : data === "sizes";
    });
  });

  const { handleChange } = useFilterChange(setQuerySize, "sizes");

  return (
    <Collapse className="absolute left-0 z-10 mt-2 top-full w-48" in={open}>
      <div className="card">
        {props.t.map((d, i) => {
          return (
            <Stack key={i} direction={"row"} gap={2} alignItems={"center"}>
              <span className="font-bold flex-grow capitalize">
                {Object.keys(d)[0]}
              </span>
              <span>{d[Object.keys(d)[0]]}</span>
              <Checkbox
                size={"small"}
                name={Object.keys(d)[0]}
                checked={querySize?.includes(Object.keys(d)[0])}
                inputProps={{ "aria-label": "Checkbox sizes" }}
                onChange={(e) => handleChange(e.target.name, e.target.checked)}
              />
            </Stack>
          );
        })}
      </div>
    </Collapse>
  );
}

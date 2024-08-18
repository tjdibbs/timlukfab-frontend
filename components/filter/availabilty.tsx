import React from "react";
import {
  Box,
  Card,
  Stack,
  Typography,
  Checkbox,
  Collapse,
} from "@mui/material";
import { useRouter } from "next/router";
import { useCustomEventListener } from "react-custom-events";
import useFilterChange from "hooks/useFilterChange";

export default function Availability(props: {
  t: { inStock: number; outOfStock: number };
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const [queryAvailability, setQueryAvailability] = React.useState(
    ((router.query?.availability ?? "") as string).split(";")
  );

  const { handleChange, push } = useFilterChange(
    setQueryAvailability,
    "availability"
  );

  useCustomEventListener("filterEvent", (data: string) => {
    setOpen((prev) => {
      return prev && data === "availability" ? false : data === "availability";
    });

    return () => setOpen(false);
  });

  return (
    <Collapse className="absolute left-0 z-10 mt-2 top-full w-52" in={open}>
      <div className="card">
        {Object.keys(props.t).map((d, i) => {
          return (
            <Stack key={i} direction={"row"} gap={2} alignItems={"center"}>
              <span className="flex-grow text-sm font-semibold">{d}</span>
              <span>{props.t[d as keyof typeof props.t]}</span>
              <Checkbox
                size={"small"}
                name={d}
                checked={queryAvailability?.includes(d)}
                inputProps={{ "aria-label": "Checkbox availability" }}
                onChange={(e) => handleChange(e.target.name, e.target.checked)}
              />
            </Stack>
          );
        })}
      </div>
    </Collapse>
  );
}

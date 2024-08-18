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

export default function Color(props: { t: { [x: string]: number }[] }) {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const [queryColor, setQueryColor] = React.useState(
    ((router.query?.colors ?? "") as string)?.split(";")
  );

  const { handleChange } = useFilterChange(setQueryColor, "colors");

  useCustomEventListener("filterEvent", (data: string) => {
    setOpen((prev) => {
      return prev && data === "colors" ? false : data === "colors";
    });
  });

  return (
    <Collapse
      sx={{
        mt: 1,
        position: { xs: "relative", sm: "absolute" },
        top: "100%",
        left: 0,
        zIndex: 10000,
        width: { xs: "100%", sm: 250 },
      }}
      in={open}
    >
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
                checked={queryColor?.includes(Object.keys(d)[0])}
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

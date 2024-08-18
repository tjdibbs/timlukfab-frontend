import React from "react";
import { Checkbox, Collapse, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useCustomEventListener } from "react-custom-events";
import useFilterChange from "hooks/useFilterChange";

type FilterChunkPropsType = {
  // handleChange: (name: string, checked: boolean) => void;
  // query: string[];
  filters: { [x: string]: number };
  // open: boolean;
  name: string;
};

function FilterChunk(props: FilterChunkPropsType) {
  const { filters, name } = props;
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState(
    ((router.query[name] ?? "") as string).split(";")
  );

  useCustomEventListener("filterEvent", (data: string) => {
    setOpen((opened) => {
      return opened && data === name ? false : data === name;
    });
  });

  const { handleChange } = useFilterChange(setQuery, name);

  return (
    <Collapse
      className="sm:absolute sm:left-0 z-10 mt-2 sm:top-full sm:w-48"
      in={open}
    >
      <div className="card">
        {Object.keys(filters).map((name, i) => {
          return (
            <Stack key={name} direction={"row"} gap={2} alignItems={"center"}>
              <span className="font-semibold text-sm flex-grow capitalize">
                {name}
              </span>
              <span>{filters[name]}</span>
              <Checkbox
                size={"small"}
                name={name}
                checked={query?.includes(name)}
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

// eslint-disable-next-line react/display-name
export default React.memo(FilterChunk);

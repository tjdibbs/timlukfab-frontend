"use client";

import { Box, Card, Grid, Paper, Skeleton, Stack } from "@mui/material";
import React from "react";

export default function Loading(props: { component?: "div" }) {
  const Component = props.component ?? Grid;
  return (
    <Component
      {...(props.component
        ? { className: "flex-grow mr-4 w-full" }
        : { item: true, xs: 6, sm: 4, md: 3 })}
    >
      <div className="card animate-pulse">
        <Skeleton height={250} />
        <Skeleton height={15} />
        <Skeleton className="h-4 rounded-lg w-1/2 mb-3" />
        <Stack direction={"row"} gap={1}>
          <Skeleton variant={"rectangular"} className="w-20 h-8 rounded-lg" />
          <Skeleton variant={"circular"} width={30} height={30} />
        </Stack>
      </div>
    </Component>
  );
}

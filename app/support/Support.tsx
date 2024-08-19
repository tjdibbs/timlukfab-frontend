"use client";

import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const Support = (): JSX.Element => {
  return (
    <React.Fragment>
      <Container sx={{ p: 3 }} className="component-wrap">
        <Typography variant="h5">Support</Typography>
      </Container>
    </React.Fragment>
  );
};

export default Support;

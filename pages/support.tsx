import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import dynamic from "next/dynamic";
import React from "react";
function Support(): JSX.Element {
  return (
    <React.Fragment>
      <Container sx={{ p: 3 }} className="component-wrap">
        <Typography variant="h5">Support</Typography>
      </Container>
    </React.Fragment>
  );
}

export default dynamic(async () => await Support, { ssr: false });

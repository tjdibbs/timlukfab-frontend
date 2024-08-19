"use client"

import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react"

const AboutUs = () => {
  return (
    <React.Fragment>
      <Container sx={{ p: 3 }}>
        <Typography variant="h6">About Us</Typography>
        <Typography variant="subtitle2" component="h5">
          Pauloxuries was founded in May 2015 and has delivered to customers
          across Africa a careful curation of the most sought-after pieces and
          brands including Fear of God, Casablanca, Off-White and Balenciaga.
          Pauloxuries’s ideology is founded on freedom to express one’s
          individual style and giving clients the opportunity to craft a
          personal brand in high fashion, uniqueness and quality designs.
        </Typography>
        <Typography variant="subtitle2" component="p">
          An established online luxury retailer, PAULOXURIES.COM has been
          created as an extension of the brand to offer a collection of careful
          luxury collections to customers across the globe
        </Typography>
      </Container>
    </React.Fragment>
  )
}
export default AboutUs
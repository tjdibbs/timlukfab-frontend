import { Metadata } from "next";
import { Box, Typography, useTheme, Container, Divider } from "@lib/mui";
import Arrivals from "@comp/LandingPage/arrivals";
import LandingPageSwiper from "@comp/LandingPage/landingSwiper";
import BrandShopping from "@comp/LandingPage/brandShopping";
import TopProducts from "@comp/LandingPage/topProducts";
import Collections from "@comp/LandingPage/collections";
import SportWears from "@comp/LandingPage/SportWears";

export const metadata: Metadata = {
  title: `Home`,
  description:
    "Get quality wears from different brands, we provide fashion combination for you, you don't have to worry about what to wear. Get yours sneakers, oversized, trousers, rugged jeans and others, for both men and women. ",
  openGraph: {
    url: "https://pauloxuries.com/",
    images: [{ url: "/identity/logo.png" }],
  },
};

export default function Page() {
  return (
    <Box className="landingPage-content">
      <Box className="window-screen">
        <LandingPageSwiper />
      </Box>
      <Box className="arrivals" mt={3}>
        <Box className="section-wrapper">
          <Arrivals />
        </Box>
      </Box>
      <Box className="shop-by-brand" mt={5}>
        <Box className="section-header" mb={4}>
          <Divider>
            <Typography variant="h6" fontWeight={800}>
              Shop By Brand
            </Typography>
          </Divider>
        </Box>
        <BrandShopping />
      </Box>
      <Box className="top-products" mt={5}>
        <Box className="section-header" mb={4}>
          <Divider>
            <Typography variant="h6" fontWeight={800}>
              Top Products
            </Typography>
          </Divider>
        </Box>
        <Box className="section-wrapper">
          <TopProducts />
        </Box>
      </Box>
      <Box className="collections">
        <Box mb={4}>
          <Divider>
            <Typography variant="h6" fontWeight={800}>
              Shop By Category
            </Typography>
          </Divider>
        </Box>

        <Collections />
      </Box>
      <Box className="sport-wears" mt={5}>
        <SportWears />
      </Box>
    </Box>
  );
}

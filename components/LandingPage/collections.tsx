import { Card, Grid, Box } from "@mui/material";
import { CardComponent } from "./brandShopping";
import useStyles from "@lib/styles";

export default function Collections() {
  const styles = useStyles();
  return (
    <Box sx={{ height: "auto" }}>
      <Grid container spacing={{xs: 1, sm: 2}}>
        {collections?.map((brand, index: number) => (
          <Grid item key={index} xs={6} sm={3} md={2}>
            <Card
              className={styles.brand}
              sx={{
                height: "100%",
                border: "1px solid lightgrey",
                background: "rgba(0,0,0,.6)",
                borderRadius: 0,
              }}
            >
              <CardComponent item={brand} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

const collections = [
  {
    image: "/category/vintages.jpg",
    category: "Vintages",
    url: "/category/vintage",
    alt: "Collections of vintage fashion wears",
  },
  {
    image: "/category/sneakers.jpg",
    category: "Sneakers",
    url: "/category/sneaker",
    alt: "Sneakers from variety of brand: gucci, prada, nike ...",
  },
  {
    image: "/category/oversized.jpg",
    category: "Oversize",
    url: "/category/t-shirt?group=oversize",
    alt: "Oversize T-shirts",
  },
  {
    image: "/category/pants.jpg",
    category: "Pants",
    url: "/category/pant",
    alt: "Quality Cargo Pants and Plain Pant to wear on style of dress",
  },
  {
    image: "/category/plain.jpg",
    category: "Plain Jeans",
    url: "/category/plain-jean",
    alt: "Deep Plain jeans to get your eyes on, if you love it plain",
  },
  {
    image: "/category/t-shirt.jpg",
    category: "T-Shirts",
    url: "/category/t-shirt",
    alt: "Awesome T-shirt from different collections, that makes you stand good.",
  },
  {
    image: "/category/rugged.jpg",
    category: "Rugged",
    url: "/category/rugged",
    alt: "Rugged Jean for both Male and Female.",
  },
  {
    image: "/category/home-made.jpg",
    category: "Home made",
    url: "/category/home-made",
    alt: "Home made fashion products from different collections.",
  },
  {
    image: "/category/shorts.jpg",
    category: "Sport Shorts",
    url: "/category/shorts",
    alt: "Sport Short Wears",
  },
];

"use client";

/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Box from "@mui/material/Box";
import useStyles from "@lib/styles";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Skeleton,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Product } from "@lib/types";
import axios from "axios";
import { useAppSelector } from "@/lib/_redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Brand = { brand: string; image: string }[];

export default function BrandImageList() {
  const styles = useStyles();
  const [width, setWidth] = React.useState<boolean>(true);
  // const [brands, setBrands] = React.useState<Brand>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  // React.useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth < 600) {
  //       setWidth(true);
  //     } else setWidth(false);
  //   };

  //   setWidth(window.innerWidth < 600);
  //   window.addEventListener("resize", handleResize);

  //   // axios
  //   //   .get<{ success: boolean; brands: Brand }>("/api/brands?limit=8")
  //   //   .then((response) => {
  //   //     setBrands(response.data.brands);
  //   //     setLoading(false);
  //   //   });

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  // if (loading) {
  //   return (
  //     <Box sx={{ height: "auto" }}>
  //       <Grid container spacing={2}>
  //         {Array.from(new Array(8)).map((brand, index: number) => (
  //           <Grid item key={index} xs={12} sm={3}>
  //             <Box height={{ xs: 100, sm: 200 }} sx={{ position: "relative" }}>
  //               <Skeleton
  //                 height="100%"
  //                 width="100%"
  //                 sx={{ transform: "none!important", borderRadius: "10px" }}
  //                 component={"div"}
  //               />
  //               <Skeleton
  //                 height="20px"
  //                 width="150px"
  //                 sx={{ bgcolor: "lightgrey" }}
  //               />
  //               <Skeleton
  //                 height="40px"
  //                 width="100px"
  //                 sx={{ bgcolor: "lightgrey" }}
  //               />
  //             </Box>
  //           </Grid>
  //         ))}
  //       </Grid>
  //     </Box>
  //   );
  // }

  // if (width) {
  //   return (
  //     <Box>
  //       {brands.slice(0, 6).map((item, index) => (
  //         <Card key={index} className={styles.mobileBrandCard}>
  //           <CardComponent item={item} />
  //         </Card>
  //       ))}
  //     </Box>
  //   );
  // }

  return (
    <Box sx={{ height: "auto" }}>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        {brands!?.map((brand, index: number) => (
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

export const CardComponent = ({
  item,
}: {
  item: Partial<{
    url: string;
    image: string;
    alt: string;
    category: string;
    brand: string;
  }>;
}) => {
  const styles = useStyles();
  const router = useRouter();

  const mode = useAppSelector((state) => state.shop.mode);

  return (
    <React.Fragment>
      <CardActionArea
        className="card-area relative min-h-[200px]"
        sx={{ width: "100%", maxHeight: "200px", height: "100%" }}
        onClick={() => router.push("/collections" + item!.brand)}
      >
        <Image
          src={"/images" + item.image}
          priority
          alt={item.alt as string}
          fill
          sizes="(max-width: 528px) 100px, 120px"
          className={`pointer-events-none min-h-[200px] w-full object-fill`}
        />
      </CardActionArea>
      <CardContent
        className="brand-content"
        sx={{ position: "absolute", left: 10, bottom: "10%", p: 0 }}
      >
        <Typography color={grey[200]} mb={2} variant="h6" fontWeight={600}>
          {item.brand ?? item.category}
        </Typography>
        <Button
          onClick={() =>
            router.push("/collections?shop_by=brand&value=" + item.url)
          }
          variant="outlined"
          size="small"
          color={mode === "light" ? "primary" : "warning"}
          className={styles.shopNow}
          sx={{ borderRadius: 0, px: 3 }}
        >
          Check
        </Button>
      </CardContent>
    </React.Fragment>
  );
};

const brands = [
  {
    image: "/brands/adidas.jpg",
    url: "adidas",
    alt: "Products from Adidas Brand",
    brand: "Adidas",
  },
  {
    image: "/brands/louis-vuitton.jpg",
    url: "louis vuitton",
    alt: "Products from Luis Vuitton Brand",
    brand: "Louis Vuitton",
  },
  {
    image: "/brands/nike.jpg",
    url: "nike",
    alt: "Products from Nike Brand",
    brand: "Nike",
  },
  {
    image: "/brands/prada.jpg",
    url: "prada",
    alt: "Products from Prada Brand",
    brand: "Prada",
  },
  // {
  //   image: "/brands/puma.jpg",
  //   url: "puma",
  //   alt: "Products from Puma Brand",
  //   brand: "Puma",
  // },
  {
    image: "/brands/versace.jpg",
    url: "versace",
    alt: "Products from Versace Brand",
    brand: "Versace",
  },
  {
    image: "/brands/gucci.jpg",
    url: "gucci",
    alt: "Products from Gucci Brand",
    brand: "Gucci",
  },
];

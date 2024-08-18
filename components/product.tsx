import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import useStyles from "@lib/styles";
import { Product } from "@lib/types";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

type Props = {
  item: Product;
};

export default function ProductCard({ item }: Props) {
  const theme = useTheme();
  const styles = useStyles();
  const router = useRouter();

  return (
    <Card elevation={0} className={styles.cardArrival}>
      <div className="h-[250px] md:h-[330px] relative">
        <Image
          src={
            "http://api.frutiv.com/images/products/" +
            item.image?.replaceAll('"', "")
          }
          loading="lazy"
          alt={item.title}
          fill
          sizes="(max-width: 528px) 250px, (max-width: 768px) 330px"
          className={`w-full object-fill  pointer-events-none`}
        />
      </div>
      <CardContent className="content">
        <div className="product-title text-sm font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
          {item.title}
        </div>
        {item.discountPercentage ? (
          <Stack alignItems={"center"} direction={"row"} gap={2}>
            <Typography
              variant="subtitle2"
              color="lightgrey"
              sx={{ textDecoration: "line-through" }}
            >
              ₦{item.price.toLocaleString("en")}
            </Typography>
            <b style={{ color: "#fff", fontWeight: 600 }}>-</b>
            <Typography
              variant="subtitle2"
              fontWeight={700}
              color={pink["A100"]}
            >
              <b style={{ fontSize: "1.1em" }}>₦</b>
              {Math.floor(
                (item.price as number) -
                  ((item.price as number) * item.discountPercentage) / 100
              ).toLocaleString("en")}
            </Typography>
          </Stack>
        ) : (
          <Typography variant="subtitle2" fontWeight={800} color={pink["A100"]}>
            <b style={{ fontSize: "1.17em" }}>₦</b>
            {item.price.toLocaleString("en")}
          </Typography>
        )}
        <Link href={"/products?p=" + item.title + "&id=" + item.id}>
          <Button
            size={"small"}
            sx={{ borderRadius: 0, mt: 2 }}
            variant="outlined"
            color="inherit"
          >
            View
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

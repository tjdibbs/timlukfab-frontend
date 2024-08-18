import React from "react";
import Box from "@mui/material/Box";
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { marked } from "marked";
import { FormDataType } from "@lib/types";
import { useForm } from "react-hook-form";

function ProductInfo() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<FormDataType>();

  const { description } = watch();

  // React.useImperativeHandle(ref, ()=>({}))

  return (
    <div className="product-info">
      <Divider sx={{ mb: 4 }}> Product Details </Divider>
      <Box maxWidth={"100%"}>
        <div className="form-group" style={{ marginBottom: "1em" }}></div>
        <Grid
          container
          className="form-group"
          spacing={{ xs: 1.5, sm: 2.5, md: 3 }}
          style={{ marginBottom: "1em" }}
        >
          <Grid item xs={12} md={8}>
            <Grid
              container
              className="form-group"
              spacing={{ xs: 1.5, sm: 2.5, md: 3 }}
              style={{ marginBottom: "1em" }}
            >
              <Grid item xs={12}>
                <TextField
                  size={"small"}
                  fullWidth
                  label={"Product title"}
                  autoComplete={"off"}
                  autoCorrect={"on"}
                  {...register("title", { required: true })}
                  error={Boolean(errors.title)}
                  helperText={
                    Boolean(errors.title) && "Enter the title of the status"
                  }
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  fullWidth
                  label={"Product price"}
                  size={"small"}
                  autoComplete={"off"}
                  type={"text"}
                  {...register("price", {
                    required: true,
                    onChange: (e) => {
                      let value = parseInt(
                        e.target.value.replaceAll(/\D/g, "")
                      );
                      setValue(
                        "price",
                        isNaN(value) ? "" : String(value.toLocaleString())
                      );
                    },
                    setValueAs: (value) =>
                      isNaN(parseInt(value))
                        ? ""
                        : parseInt(value.replaceAll(/\D/g, "")),
                  })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position={"start"}>
                        <Typography variant={"subtitle1"} fontWeight={700}>
                          #
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                  helperText={Boolean(errors.price) && "Enter product price"}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  fullWidth
                  {...register("discountPercentage", { maxLength: 4 })}
                  label={"Discount"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position={"end"}>
                        <Typography variant={"subtitle1"} fontWeight={800}>
                          %
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                  size={"small"}
                  autoComplete={"off"}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label={"Stock"}
                  size={"small"}
                  fullWidth
                  {...register("stock", { required: true })}
                  type={"number"}
                  error={Boolean(errors.stock)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label={"Brand"}
                  fullWidth
                  size={"small"}
                  {...register("brand", { required: true })}
                  error={Boolean(errors.brand)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label={"Category"}
                  fullWidth
                  size={"small"}
                  {...register("category", { required: true })}
                  error={Boolean(errors.category)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={"Description"}
                  autoComplete={"off"}
                  autoCorrect={"true"}
                  {...register("description")}
                  multiline
                  rows={4}
                  helperText={
                    "Enter a brief description of the product you want to upload"
                  }
                />
                <div
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(description ?? ""),
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box className={"form-group sizes"}>
              <TextField
                fullWidth
                label={"Sizes"}
                autoComplete={"off"}
                autoCorrect={"true"}
                {...register("sizes")}
                helperText={"Example 2xl, 3xl"}
              />
            </Box>
            <Box className="colors form-group" mt={2}>
              <TextField
                fullWidth
                label={"Colors"}
                autoComplete={"off"}
                autoCorrect={"true"}
                {...register("colors")}
                helperText={"Example: red, green, voilet"}
              />
            </Box>
          </Grid>
        </Grid>
        {/* <Box className={"action-group"} my={3}>
            <Button
              variant={"outlined"}
              type={"submit"}
              fullWidth
              size={"large"}
              color={"primary"}
              disabled={response.loading}
            >
              {response.loading && (
                <CircularProgress size={20} color={"inherit"} />
              )}
              <Typography
                component={"span"}
                ml={response.loading ? 2 : 0}
                fontWeight={500}
                variant={"subtitle1"}
                textTransform={"none"}
              >
                {response.loading ? response.message : "Submit for review"}
              </Typography>
            </Button>
          </Box> */}
      </Box>
    </div>
  );
}

export default ProductInfo;

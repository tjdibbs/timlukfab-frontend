"use client";

import React from "react";
import Box from "@mui/material/Box";
import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { AppState, FormDataType, Response } from "@lib/types";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/lib/_redux/store";
import LinearProgress from "@mui/material/LinearProgress";
import Cookie from "js-cookie";
import { marked } from "marked";
import ProductSizes from "@comp/upload/ProductSizes";
import SelectProductColors from "@comp/upload/SelectProductColors";
import SelectImages, { ProductImages } from "@comp/upload/SelectImages";
import useMessage from "@hook/useMessage";
import { BASE_URL } from "@lib/constants";
import JWT from "jsonwebtoken";
import { useRouter } from "next/navigation";

const Upload = function ({ user }: { user: AppState["user"] }) {
  const [progress, setProgress] = React.useState<number>(0);
  const [response, setResponse] = React.useState<Response>({});
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { alertMessage } = useMessage();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<FormDataType>();

  const { description } = watch();

  React.useEffect(() => {
    // if (props.user) {
    //   dispatch(auth(props.user));
    // } else {
    //   router.replace("/sign-in").then(() => {
    //     alertMessage("You are not authorized to access that page", "error");
    //   });
    // }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (progress === 100) {
      setResponse({ loading: true, message: "Waiting for response..." });
    }
  }, [progress]);

  const onSubmit = React.useCallback(
    async (data: FormDataType): Promise<void> => {
      // ---------- Validating Form Fields ---------
      let form = {
        userid: "12342",
        ...data,
        ...imagesRef.current?.getImages(),
        sizes: sizesRef.current?.getSizes(),
        colors: colorsRef.current?.getColors(),
      };

      let requiredFields: (keyof FormDataType)[] = [
        "frontImage",
        "backImage",
        "title",
        "price",
        "stock",
        "category",
        "colors",
        "sizes",
      ];
      let missingFields: (keyof FormDataType)[] = [];

      requiredFields.forEach((field) => {
        if (!form[field]) missingFields.push(field);
      });

      if (missingFields?.length || !form.sizes || !form.colors) {
        return alertMessage(
          "Some fields (" + String(missingFields) + ") are missing",
          "error",
        );
      }

      // --------- Passed Validation -----------

      try {
        setResponse({ loading: true, message: "Uploading..." });

        let formData: FormData = new FormData();
        let allFormName = Object.keys(form) as [x: keyof FormDataType];

        allFormName.forEach((name) => {
          if (name === "additionalImages") {
            form.additionalImages.forEach((file) => {
              formData.append("additionalImage", file);
            });
          } else
            formData.append(
              name,
              (["sizes", "colors"].includes(name)
                ? JSON.stringify(form[name])
                : form[name]) as string,
            );
        });

        const config = {
          headers: { "content-type": "multipart/form-data" },
          onUploadProgress: (event: any) => {
            setProgress(Math.round((event.loaded * 100) / event.total));
          },
        };

        const request = await axios.post<
          Pick<Response, "success" | "message" | "error">
        >(BASE_URL + "/api/upload", formData, config);

        let res = await request.data;
        // if (res.error) {
        //   Cookie.remove("session", { path: "/" });
        //   await router.replace("/sign-in");
        //   return;
        // }

        if (!res.success) throw new Error(res.message);

        setResponse({
          success: res.success,
          message: res.message,
        });

        if (res.success) {
          // Clear all fields for new upload
          reset();
          imagesRef.current?.clear();
          sizesRef.current?.clear();
          colorsRef.current?.clear();

          // alert success message
          alertMessage("Product Uploaded Successfully", "success");
        }
      } catch (e: any) {
        alertMessage(e.message, "error");
      }

      setProgress(0);
      setResponse({});
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router],
  );

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setResponse({});
  };

  const sizesRef = React.useRef<{
    getSizes(): { [x: string]: number };
    clear(): void;
  }>(null);
  const colorsRef = React.useRef<{
    getColors(): { [x: string]: number };
    clear(): void;
  }>(null);
  const imagesRef = React.useRef<{ getImages(): ProductImages; clear(): void }>(
    null,
  );

  return (
    <Container
      maxWidth={"xl"}
      sx={{ p: 0 }}
      className="component-wrap uploader"
    >
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        aria-autocomplete={"none"}
        py={3}
      >
        <Box mb={"2em"} className="form-group">
          <Typography variant={"h6"} color={"primary"} sx={{ fontWeight: 800 }}>
            Upload Product
          </Typography>
        </Box>
        <SelectImages ref={imagesRef} />
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
                          e.target.value.replaceAll(/\D/g, ""),
                        );
                        setValue(
                          "price",
                          isNaN(value) ? "" : String(value.toLocaleString()),
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
                    error={Boolean(errors.price)}
                    helperText={Boolean(errors.price) && "Enter product price"}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    {...register("discountPercentage", { maxLength: 2 })}
                    label={"Discount"}
                    type={"number"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position={"end"}>
                          <Typography variant={"subtitle1"} fontWeight={800}>
                            %
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(errors.discountPercentage)}
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
                <ProductSizes ref={sizesRef} />
              </Box>
              <Box className="colors form-group" mt={2}>
                <SelectProductColors ref={colorsRef} />
              </Box>
            </Grid>
          </Grid>
          <Box className={"action-group"} my={3}>
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
          </Box>
        </Box>
        <Snackbar
          open={response.loading || response.success !== undefined}
          autoHideDuration={response.success ? 6000 : 60000}
          onClose={handleClose}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              &times;
            </IconButton>
          }
        >
          <Alert
            severity={
              response.success
                ? response.success
                  ? "success"
                  : "error"
                : "info"
            }
          >
            <AlertTitle>{response.message || "Uploading..."}</AlertTitle>
            {!!progress && (
              <Box sx={{ display: "flex", alignItems: "center", width: 250 }}>
                <Box sx={{ flexGrow: 1, mr: 1 }}>
                  <LinearProgress variant="determinate" value={progress} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >{`${Math.round(progress)}%`}</Typography>
                </Box>
              </Box>
            )}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   // @ts-ignore
//   // const user = req.session.user ?? null;
//   try {
//     const reqSessionUser = ctx.req.cookies;
//     let access_token = reqSessionUser.access_token;

//     if (!access_token) throw Error("Not Allowed");

//     let user = JWT.verify(access_token, process.env.SECRET_KEY as string);
//     if (!user) throw Error("Not Allowed");

//     return {
//       props: {
//         user,
//       },
//     };
//   } catch (error) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: true,
//       },
//     };
//   }
// };

export default Upload;

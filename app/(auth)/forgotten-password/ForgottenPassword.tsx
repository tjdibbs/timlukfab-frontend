"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import message from "lib/message";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  CircularProgress,
  Collapse,
  Divider,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import dynamic from "next/dynamic";
import { BASE_URL } from "@lib/constants";
import useMessage from "@hook/useMessage";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  setOpen?: Dispatch<SetStateAction<boolean>>;
};

const ForgottenPassword = ({ setOpen }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<{ email: string }>();
  const theme = useTheme();

  const { alertMessage } = useMessage();

  const onSubmit = async (data: { email: string }) => {
    try {
      if (loading) return;
      setLoading(true);

      const request = await axios.post(
        BASE_URL + "/api/auth/request-password-change",
        {
          email: data.email,
        }
      );

      const { success, message } = await request.data;
      alertMessage(message, success ? "success" : "error");
    } catch (e: any) {
      alertMessage("We are having sending verifying your email", "error");
    }

    setLoading(false);
  };

  const pageDescription = {
    title: `Forgotten Password`,
    description:
      "Request for change of password if you can't remember it anymore, just submit your registered email address and a link will be sent to you if the email is registered.",
    url: "https://pauloxuries.com/forgotten-password",
    image: "https://pauloxuries.com/identity/dark-logo.png",
  };

  return (
    <div className="component-wrap card">
      <Divider textAlign="left">
        <Typography
          variant="subtitle1"
          component="h2"
          my={1}
          fontWeight={700}
          color={"grey"}
        >
          Forgotten Password
        </Typography>
      </Divider>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <p className="font-bold text-sm my-2">
          Enter your registered email address
        </p>
        <Box mb={2} maxWidth={400}>
          <TextField
            label={"Enter email"}
            {...register("email", { required: true })}
            fullWidth
            autoComplete="email"
            disabled={loading}
            variant="outlined"
            size={"small"}
            error={Boolean(errors.email)}
            helperText={Boolean(errors.email) && "This field is required"}
          />
        </Box>
        <Box className={"action-group"} mb={3}>
          <Button
            variant={"contained"}
            type={"submit"}
            disabled={loading}
            className="bg-primary-low capitalize"
          >
            {loading && <CircularProgress size={20} color={"inherit"} />}
            <span>{loading ? "Verifying..." : "Get Link"}</span>
          </Button>
        </Box>
      </form>
    </div>
  );
}

const color = {
  red: "#c507074a",
  green: "#07c51e4a",
  red_text: "#833232",
  green_text: "green",
};

export default ForgottenPassword;
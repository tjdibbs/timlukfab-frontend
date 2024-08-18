import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSnackbar } from "notistack";
import router from "next/router";
import { pink } from "@mui/material/colors";
import { GetServerSideProps } from "next";
import message from "lib/message";
import JWT from "jsonwebtoken";
import useMessage from "@hook/useMessage";
import { BASE_URL } from "@lib/constants";

type Props = { email: string; error?: string };
type Inputs = { password: string; confirm: string };

export default function SignIn({ email, error }: Props): JSX.Element {
  const [loading, setLoading] = React.useState<boolean>(false);

  const theme = useTheme();
  const { alertMessage } = useMessage();
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm<Inputs>();

  const { password, confirm } = watch();

  const onSubmit = async (data: Inputs) => {
    try {
      if (loading) return;
      setLoading(true);

      if (!(password === confirm)) throw new Error("Password doesn't match");
      const request = await axios.post(
        BASE_URL + "/api/auth/reset-password",
        Object.assign(data, { email })
      );

      const { success, message: msg } = await request.data;

      alertMessage(
        success
          ? "Password Changed Successfully"
          : msg ?? "Error changing password",
        success ? "success" : "error"
      );

      setLoading(false);
      if (success) router.replace("/sign-in");
    } catch (e: any) {
      console.log({ e });
      alertMessage(e.message, "error");
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="card">
        <p className="font-bold uppercase text-lg">{error}</p>
        <p>The link looks like expired one.</p>
      </div>
    );
  }

  return (
    <div className="reset-wrapper component-wrap card pt-10">
      <Divider textAlign="center">
        <span className="font-bold">Reset Password</span>
      </Divider>
      <Box
        className="grid place-items-center py-10"
        component="form"
        action="#"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="mt-5 text-sm font-semibold">
          The reset password link will expire after 2hrs of creation.
        </p>
        <div className={"form-body w-[350px] max-w-full mt-4"}>
          <Box mb={2} className="form-group">
            <TextField
              label={"New Password"}
              {...register("password", { required: true })}
              fullWidth
              autoComplete="new-password"
              variant="outlined"
              size={"small"}
              type={"password"}
              error={Boolean(errors.password)}
              helperText={Boolean(errors.password) && "This field is required"}
            />
          </Box>
          <Box mb={2} className="form-group">
            <TextField
              label={"Confirm Password"}
              {...register("confirm", { required: true })}
              fullWidth
              type={"password"}
              size={"small"}
              autoComplete="confirm-password"
              variant="outlined"
              error={Boolean(errors.confirm)}
              helperText={Boolean(errors.confirm) && "This field is required"}
            />
          </Box>
          <Box className={"action-group"} mb={3}>
            <Button
              variant={"contained"}
              size={"small"}
              type={"submit"}
              color={"primary"}
              disabled={loading || !password || !confirm}
              className="bg-primary-low capitalize"
            >
              {loading && (
                <CircularProgress
                  className="mr-2"
                  size={20}
                  color={"inherit"}
                />
              )}
              <span>Change Password</span>
            </Button>
          </Box>
        </div>
      </Box>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  try {
    const token = query.token as string;
    if (!token) {
      return {
        notFound: true,
      };
    }

    const SECRET_KEY = process.env.SECRET_KEY as string;

    const user = JWT.verify(token, SECRET_KEY);
    return {
      props: {
        ...(user as JWT.JwtPayload),
      },
    };
  } catch (error: any) {
    return {
      props: {
        error: error.message,
      },
    };
  }
};

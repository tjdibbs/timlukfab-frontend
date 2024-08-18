import { Container, useTheme, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { useSnackbar } from "notistack";
import router from "next/router";
import Cookies from "js-cookie";
import { Button, Input } from "antd";
import { motion } from "framer-motion";
import message from "@lib/message";
import { BASE_URL } from "@lib/constants";

type State = Partial<{
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}>;

type LoadType = { pending: boolean; message: null | string };

function SignUp(): JSX.Element {
  const [state, setState] = React.useState<State>({});

  const [loading, setLoading] = React.useState<LoadType>({
    pending: false,
    message: null,
  });
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const stateInComplete =
    Object.keys(state).length < 4 ||
    Object.values(state).some((value) => !value);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (loading.pending) return;

      if (stateInComplete) {
        message(enqueueSnackbar, "All Fields Required", "error");
      }

      setLoading({ pending: true, message: null });
      const request = await axios.post(BASE_URL + "/api/sign-up", state);
      const response = await request.data;

      enqueueSnackbar(
        response?.message || "Account Created Successfully: Redirecting...",
        {
          variant: response.success ? "success" : "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          autoHideDuration: 3000,
        }
      );

      if (response.success) {
        setLoading({ ...loading, message: "Redirecting...." });

        Cookies.set(
          "request-verification",
          JSON.stringify({ firstname: state.firstname, email: state.email })
        );

        await router.replace("/email/request-verification");
      } else setLoading({ pending: false, message: null });
    } catch (e: any) {
      message(enqueueSnackbar, e.message, "error");
      setLoading({ pending: false, message: null });
    }
  };

  return (
    <Container className="auth-container component-wrap">
      <div className="auth-wrapper bg-white rounded-xl shadow-lg w-[400px] max-w-full mx-auto">
        <motion.form
          layoutId="auth-form"
          className="w-full py-14 my-6 px-3 sm:px-6 bg-primary-low/5 mx-auto"
          action="#"
          onSubmit={onSubmit}
        >
          <div className={"form-header mb-4"}>
            <Divider>
              <div className="font-extrabold text-lg text-center">SIGN UP</div>
            </Divider>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="form-group">
              <label htmlFor="email" className="block font-bold mb-1 text-sm">
                First Name
              </label>
              <Input
                placeholder={"First name"}
                size={"large"}
                className={"firstname_form_control"}
                onChange={({ target }) =>
                  setState({ ...state, firstname: target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="block font-bold mb-1 text-sm">
                Last name
              </label>
              <Input
                placeholder={"Last name"}
                size={"large"}
                className={"lastname_form_control"}
                onChange={({ target }) =>
                  setState({ ...state, lastname: target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="block font-bold mb-1 text-sm">
                Email
              </label>
              <Input
                placeholder={"Enter a valid email"}
                type="email"
                size={"large"}
                className={"email_form_control"}
                onChange={({ target }) =>
                  setState({ ...state, email: target.value })
                }
              />
            </div>
            <div className={"form-group mb-2"}>
              <label htmlFor="email" className="text-sm font-bold mb-1 block">
                Password
              </label>
              <Input.Password
                size="large"
                placeholder="Enter Password"
                onChange={({ target }) =>
                  setState({ ...state, password: target.value })
                }
              />
            </div>
            <Box className={"action-group"} mb={3}>
              <Button
                size={"large"}
                type={"primary"}
                htmlType="submit"
                className="w-full bg-primary-low"
                loading={loading.pending}
                disabled={
                  loading.pending || Boolean(loading.message) || stateInComplete
                }
              >
                <span>
                  {loading.pending
                    ? "Authenticating..."
                    : loading.message || "Submit"}
                </span>
              </Button>
            </Box>
            <Box textAlign={"center"} mt={2}>
              <div>
                Have an account already ?
                <Link
                  className="text-primary-low ml-2 font-bold"
                  href={"/sign-in"}
                >
                  <span>Sign In</span>
                </Link>
              </div>
            </Box>
          </div>
        </motion.form>
      </div>
    </Container>
  );
}

export default SignUp;

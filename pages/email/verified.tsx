import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import JWT from "jsonwebtoken";
import React from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  email: string;
  firstname: string;
  error?: string;
};

const Verified: React.FC<Props> = (props) => {
  const { email, firstname, error } = props;
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const resendEmail = async () => {
    if (!email) {
      router.replace("/sign-in");
      return;
    }
    const sendEmailRequest = await axios.post<{ success: boolean }>(
      "/api/send-email",
      { email, firstname }
    );
    const { success } = (await sendEmailRequest).data;

    enqueueSnackbar(
      success
        ? "Email Sent Successfully, Check email"
        : "We having issue sending you an email, please contact support team, Sorry for the inconvenient",
      {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        variant: success ? "success" : "error",
        autoHideDuration: 3000,
      }
    );
  };

  React.useEffect(() => {
    if (!error) {
      Cookies.remove("request_verification");
    }
  }, [error]);

  if (error) {
    return (
      <Card sx={{ p: 2 }}>
        <Stack spacing={3}>
          <Divider>
            <Typography variant={"h6"} fontWeight={900} color={"#3aa53a"}>
              Email Verification Error
            </Typography>
          </Divider>
          <Typography variant={"subtitle2"}>
            We are having issue verifying your email, it looks like the
            verification link has expired
          </Typography>
          <Box>
            <Button variant={"contained"} size={"large"} onClick={resendEmail}>
              Request new verification link
            </Button>
          </Box>
        </Stack>
      </Card>
    );
  }

  return (
    <Box
      textAlign={"center"}
      py={"5em"}
      sx={{ width: 600, mx: "auto" }}
      className="component-wrap"
    >
      <Card sx={{ p: 2 }}>
        <Stack spacing={3}>
          <Divider>
            <Typography variant={"subtitle1"} fontWeight={700} color={"green"}>
              Email Verification Complete
            </Typography>
          </Divider>
          <Typography variant={"subtitle2"}>
            Hi <b>{firstname}</b>!, Thanks for choosing pauloxuries store. Your
            email <b style={{ color: "#b15945" }}>{email}</b>, has been verified
            successfully.
          </Typography>
          <Box>
            <Link href={"/sign-in"}>
              <Button
                variant={"contained"}
                color={"warning"}
                sx={{ fontWeight: 600, color: "#fff" }}
              >
                Sign in now
              </Button>
            </Link>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   try {
//     const user = JWT.verify(
//       query.token as string,
//       process.env.SECRET_KEY as string
//     ) as { email: string };

//     const updateQuery = `UPDATE Users SET verified=1 WHERE email='${user.email}'`;
//     await Pool.query(updateQuery);

//     return {
//       props: {
//         success: true,
//         ...user,
//       },
//     };
//   } catch (error) {
//     return {
//       props: {
//         error: "Token Expired",
//       },
//     };
//   }
// };

export default Verified;

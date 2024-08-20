"use client";

import { Box, Button, Card, Stack, Typography } from "@mui/material";
import axios from "axios";
import JWT from "jsonwebtoken";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSnackbar } from "notistack";

export default function RequestEmailVerification({
  email,
  firstname,
}: {
  email: string;
  firstname: string;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect") as string;
  const resendEmail = async () => {
    const sendEmailRequest = await axios.post<{ success: boolean }>(
      "/api/send-email",
      { email, firstname }
    );
    const { success } = (await sendEmailRequest).data;

    enqueueSnackbar(
      success
        ? "Email Sent Successfully, Check email,  it should arrive shortly.  "
        : "We having issue sending you an email, please contact support team, Sorry for the inconvenient",
      {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        variant: success ? "success" : "error",
      }
    );
  };

  return (
    <div className="component-wrap mt-10 max-w-[400px] mx-auto text-center">
      <div className="card bg-primary-low/10 p-10">
        <Stack spacing={3}>
          <Typography variant={"h6"} fontWeight={700} color={"primary"}>
            Email Verification Request
          </Typography>
          <Typography variant={"subtitle2"}>
            Hi <b>{firstname}</b>!, Thanks for choosing pauloxuries store. A
            verification link has been sent to your email{" "}
            <b style={{ color: "#b15945" }}>{email}</b>, check your email and
            comfirm your address
          </Typography>
          <Box>
            <Button
              size={"large"}
              sx={{ mb: 2 }}
              className="bg"
              onClick={resendEmail}
            >
              Resend Verification Link
            </Button>
          </Box>

          <Link href={redirect ?? "/collections"}>
            <Button size={"small"} color={"warning"} variant={"outlined"}>
              Already Clicked The Link
            </Button>
          </Link>
        </Stack>
      </div>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { req } = ctx;
//   const user_data = req.cookies["request_verification"];
//   var user: { email: string; firstname: string };

//   if (user_data) user = JSON.parse(user_data ?? "{}");
//   else {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       ...user!,
//     },
//   };
// };

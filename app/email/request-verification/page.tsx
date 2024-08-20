import { cookies } from "next/headers";
import RequestVerification from "./RequestVerification";
import { notFound } from "next/navigation";

interface User {
  email: string;
  firstname: string;
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     const { req } = ctx;
//     const user_data = req.cookies["request_verification"];
//     var user: { email: string; firstname: string };

//     if (user_data) user = JSON.parse(user_data ?? "{}");
//     else {
//       return {
//         notFound: true,
//       };
//     }

//     return {
//       props: {
//         ...user!,
//       },
//     };
//   };

const getProps = async () => {
  const cookieStore = cookies();
  const userData = cookieStore.get("request_verification");

  if (!userData) {
    return {
      error: true,
    };
  }

  let user: User;
  try {
    user = JSON.parse(userData.value || "{}");
    return { user };
  } catch (error) {
    // Handle JSON parse errors
    return { error: true };
  }
};

export default async function Page() {
  const { error, user } = await getProps();

  if (error) {
    return notFound();
  }

  return (
    <RequestVerification email={user!.email} firstname={user!.firstname} />
  );
}

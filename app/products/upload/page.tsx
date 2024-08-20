import { cookies } from "next/headers";
import Upload from "./Upload";
import JWT from "jsonwebtoken";
import { redirect } from "next/navigation";

const getUser = async () => {
  try {
    const cookieStore = cookies();
    const access_token = cookieStore.get("access_token")?.value;

    if (!access_token) {
      return null;
    }

    const user = JWT.verify(access_token, process.env.SECRET_KEY as string);

    if (!user) {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export default async function page() {
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  return <Upload user={user} />;
}

import React from "react";
import { useAppDispatch } from "@lib/redux/store";
import Cookie from "js-cookie";
import axios from "axios";
import { BASE_URL } from "./constants";
import useMessage from "@hook/useMessage";
import { auth } from "./redux/reducer";

const GetUser = () => {
  const dispatch = useAppDispatch();
  const { alertMessage } = useMessage();

  const fetchUser = React.useCallback(async () => {
    try {
      const getUserReq = await axios.get(BASE_URL + "/api/auth/getUser", {
        withCredentials: true,
      });
      const { user } = await getUserReq.data;

      if (user) {
        dispatch(auth({ ...user, wishlist: JSON.parse(user.wishlist) }));
      }
    } catch (error) {
      console.error({ error });
      alertMessage(
        "We are having issue communicating with the server",
        "error"
      );
    }
  }, [alertMessage, dispatch]);

  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return null;
};

export default GetUser;

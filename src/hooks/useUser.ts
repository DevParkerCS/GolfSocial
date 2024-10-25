import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { PublicUserType } from "../types/UserTypes";

export const useUser = () => {
  const { userId, setUserId, user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setUserId(user._id);
    }
  }, [user]);

  return { userId, setUserId, user, setUser };
};

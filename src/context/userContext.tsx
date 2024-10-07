import { createContext, ReactNode, useEffect, useState } from "react";
import { PublicUserType } from "../types/UserTypes";
import axios from "axios";

// Define the shape of the context
type UserContextType = {
  userId: string;
  setUserId: (userId: string) => void;
  user: PublicUserType | null;
  setUser: (user: PublicUserType | null) => void;
};

// Create the context with default values and types
export const UserContext = createContext<UserContextType>({
  userId: "",
  setUserId: () => {},
  user: null, // Match the initial state
  setUser: () => {},
});

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userId, setUserId] = useState<string>("");
  const [user, setUser] = useState<PublicUserType | null>(null);

  useEffect(() => {
    CheckUserSaved();
  }, []);

  const CheckUserSaved = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/validateToken",
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.data.isValid) {
        setUser(response.data.user);
        setUserId(response.data.user._id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContext.Provider value={{ userId, setUserId, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

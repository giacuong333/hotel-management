import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { showToast } from "../../utils/showToast";

const userContext = createContext();

const UserProvider = ({ children }) => {
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(false);
      const [isCreatingAccount, setIsCreatingAccount] = useState(false);
      const [error, setError] = useState("");

      useEffect(() => {
            const fetchUser = async () => {
                  try {
                        setLoading(true);
                        const response = await axios.get("http://localhost:5058/user", {
                              headers: {
                                    "Content-Type": "application/json",
                              },
                        });
                        setUser(response.data);
                  } catch (error) {
                        setError("Failed to fetch user data. Please try again later.");
                        console.error(error);
                  } finally {
                        setLoading(false);
                  }
            };

            fetchUser();
      }, []);

      const signIn = async (payload) => {};

      const signUp = async (payload) => {
            try {
                  setIsCreatingAccount(true);
                  const response = await axios.post("http://localhost:5058/user/register", payload, {
                        headers: {
                              "Content-Type": "application/json",
                        },
                  });
                  if (response.status === 201) {
                        setUser(response.data); // Assuming the response contains user data
                        return response;
                  }
            } catch (error) {
                  if (error.status === 409) {
                        showToast(error.response.data.message, "error");
                  }
                  setError("Failed to create account. Please try again.");
            } finally {
                  setIsCreatingAccount(false);
            }
      };

      const signOut = async () => {};

      return (
            <userContext.Provider value={{ user, loading, error, signIn, signUp, signOut, isCreatingAccount }}>
                  {children}
            </userContext.Provider>
      );
};

export const useUser = () => useContext(userContext);

export default UserProvider;

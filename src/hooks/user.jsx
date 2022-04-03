import axios from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

import Loading from "../Components/Loading";
import { API_URL } from "../const";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const tokenSaved = localStorage.token;
  const [isLogin, setIsLogin] = useState(
    tokenSaved === undefined ? false : true
  );
  const [token, setToken] = useState(
    tokenSaved === undefined ? null : tokenSaved
  );
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const logout = useCallback(() => {
    // console.log("logout", localStorage.getItem("token"));
    setToken(null);
    setIsLogin(false);
    setUser(null);
    setLoading(false);
    localStorage.removeItem("token");
  }, []);

  const fetchUser = useCallback(
    (options) => {
      return new Promise((resolve, reject) => {
        const userURL = `${API_URL}/accounts/user/`;
        const userRequest = axios.get(userURL, options);

        const request = [userRequest];

        axios
          .all(request)
          .then(
            axios.spread((...responses) => {
              setUser(responses[0].data);
              setIsLogin(true);
              setLoading(false);
              resolve(123);
            })
          )
          .catch((err) => {
            console.log(err);
            if (axios.isAxiosError(err)) {
              logout();
              resolve(123);
            }
            reject(err);
          });
      });
    },
    [logout]
  );

  const login = useCallback(
    (ld) => {
      setLoading(true);
      return axios
        .post(`${API_URL}/rest-auth/login/`, ld)
        .then(async (res) => {
          setToken(res.data.key);
          localStorage.setItem("token", res.data.key);

          const options = {
            headers: { Authorization: `Token ${res.data.key}` },
          };

          await fetchUser(options);
          return;
        })
        .catch((err) => {
          setLoading(false);
          throw err;
        });
    },
    [fetchUser]
  );

  useLayoutEffect(() => {
    if (localStorage["token"] !== undefined) {
      const options = {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      };
      const getUser = async () => {
        setLoading(true);
        await fetchUser(options);
        setLoading(false);
      };
      getUser();
    }
  }, [fetchUser]);

  return (
    <UserContext.Provider
      value={{
        isLogin,
        loading,
        actions: {
          login,
          logout,
        },
        state: {
          user,
          token,
        },
      }}
    >
      {loading ? <Loading /> : children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);
export default useUser;

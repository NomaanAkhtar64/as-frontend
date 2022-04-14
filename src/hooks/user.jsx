import axios from 'axios';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import Loading from '../components/Loading';
import { API_URL } from '../const';

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
    setToken(null);
    setIsLogin(false);
    setUser(null);
    setLoading(false);
    localStorage.removeItem('token');
  }, []);

  const login = useCallback((ld) => {
    setLoading(true);
    return axios
      .post(`${API_URL}/rest-auth/login/`, ld)
      .then(async (res) => {
        setToken(res.data.key);
        localStorage.setItem('token', res.data.key);
      })
      .catch((err) => {
        setLoading(false);
        throw err;
      });
  }, []);

  const signup = useCallback((data) => {
    setLoading(true);
    return axios
      .post(`${API_URL}/api/employee_signup/`, data)
      .then((res) => {
        console.log('EMPLOYEE SIGNUP REQUEST SEND');
      })
      .catch((err) => {
        setLoading(false);
        throw err;
      });
  }, []);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    if (token !== null && user === null) {
      setLoading(true);
      axios
        .get(`${API_URL}/rest-auth/user/`, {
          headers: { Authorization: `Token ${token}` },
          cancelToken: cancelToken.token,
        })
        .then((res) => {
          setUser(res.data);
          setIsLogin(true);
          setLoading(false);
          return;
        })
        .catch((err) => {
          if (axios.isAxiosError(err)) {
            logout();
            return;
          }
          console.log(err);
        });
    }
    return () => cancelToken.cancel();
  }, [token, user, logout]);

  function render() {
    if (isLogin && loading) return <Loading />;

    if (user === null && isLogin === true) {
      return <Loading />;
    }

    return children;
  }

  return (
    <UserContext.Provider
      value={{
        isLogin,
        loading,
        actions: {
          login,
          logout,
          signup,
        },
        state: {
          user,
          token,
        },
      }}
    >
      {render()}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);
export default useUser;

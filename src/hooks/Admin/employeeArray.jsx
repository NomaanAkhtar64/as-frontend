import axios from 'axios';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { API_URL } from '../../const';
import useUser from '../user';

const Context = createContext(null);

export function EmployeeArrayProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reloadTrigger, setReloadTrigger] = useState(false);

  const {
    state: { token },
  } = useUser();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    setLoading(true);
    axios
      .get(`${API_URL}/api/employee/`, {
        headers: { Authorization: `Token ${token}` },
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        setEmployees(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    return () => cancelToken.cancel();
  }, [token]);

  const refetch = useCallback(() => {
    setReloadTrigger(!reloadTrigger);
  }, [reloadTrigger]);

  return (
    <Context.Provider
      value={{ data: employees, actions: { refetch }, loading }}
    >
      {children}
    </Context.Provider>
  );
}

const useEmployeeArray = () => useContext(Context);
export { useEmployeeArray };

import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_URL } from '../../const';
import useUser from '../user';

const Context = createContext(null);

export function EmployeeProvider({ children }) {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    state: { token, user },
  } = useUser();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    setLoading(true);
    axios
      .get(`${API_URL}/api/employee/${user.employee_id}/`, {
        headers: { Authorization: `Token ${token}` },
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        setEmployee(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    return () => cancelToken.cancel();
  }, [token, user]);

  return (
    <Context.Provider value={{ data: employee, loading }}>
      {!loading && employee ? children : <CircularProgress />}
    </Context.Provider>
  );
}

const useEmployee = () => useContext(Context);
export { useEmployee };

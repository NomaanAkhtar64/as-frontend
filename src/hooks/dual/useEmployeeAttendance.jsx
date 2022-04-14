import axios from 'axios';
import React from 'react';
import { API_URL } from '../../const';
import useUser from '../user';

export function useEmployeeAttendance(viewMode, id = undefined) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const {
    state: { token },
  } = useUser();

  React.useEffect(() => {
    var URL;
    if (id === undefined) {
      URL = `${API_URL}/api/employee_attendance/?viewmode=${viewMode}`;
    } else {
      URL = `${API_URL}/api/employee/${id}/attendance/?viewmode=${viewMode}`;
    }
    const cancelToken = axios.CancelToken.source();
    setLoading(true);
    axios
      .get(URL, {
        headers: { Authorization: `Token ${token}` },
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    return () => cancelToken.cancel();
  }, [id, viewMode, token]);

  return { data, loading };
}

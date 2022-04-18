import axios from 'axios';
import React from 'react';
import { API_URL } from '../../const';
import useUser from '../user';

export function useHolidays(viewMode) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const {
    state: { token },
  } = useUser();
  React.useEffect(() => {
    const URL = `${API_URL}/api/holidays/?viewmode=${viewMode}`;
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
  }, [token, viewMode]);

  const load = React.useCallback(() => {
    setLoading(true);
  }, []);

  const create = React.useCallback(
    (data) => {
      return axios
        .post(`${API_URL}/api/holidays/create/`, data, {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    },
    [token]
  );

  return { data, loading, actions: { load, create } };
}

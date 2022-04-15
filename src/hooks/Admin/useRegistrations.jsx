import axios from 'axios';
import React, { useCallback, useMemo } from 'react';
import { API_URL } from '../../const';
import useUser from '../user';

export function useRegistrations() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const {
    state: { token },
  } = useUser();
  const fetchAllController = useMemo(() => new AbortController(), []);
  const fetchController = useMemo(() => new AbortController(), []);
  const fetchAll = useCallback(
    (allFetchToken) => {
      const URL = `${API_URL}/api/registrations/`;
      setData(null);
      setLoading(true);
      return axios
        .get(URL, {
          headers: { Authorization: `Token ${token}` },
          signal: fetchAllController.signal,
        })
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log('Request canceled', err.message);
          } else {
            console.log(err);
          }
          setLoading(false);
        });
    },
    [token, fetchAllController]
  );

  const fetchAllCancel = useCallback(
    (allFetchToken) => {
      fetchAllController.abort();
    },
    [fetchAllController]
  );

  const fetch = useCallback(
    (id) => {
      const URL = `${API_URL}/api/registrations/${id}/`;
      setData(null);
      setLoading(true);
      return axios
        .get(URL, {
          headers: { Authorization: `Token ${token}` },
          signal: fetchController.signal,
        })
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log('Request canceled', err.message);
          } else {
            console.log(err);
          }
          setLoading(false);
        });
    },
    [token, fetchController]
  );
  const fetchCancel = useCallback(() => {
    fetchController.abort();
  }, [fetchController]);

  const deny = useCallback(
    (id) => {
      return axios
        .delete(`${API_URL}/api/registrations/${id}/?complete`, {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
          setData([...data.filter((d) => d.id !== id)]);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    },
    [token, data]
  );

  const accept = useCallback(
    async (id, data) => {
      return axios
        .post(`${API_URL}/api/employee/`, data, {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
          console.log('EMPLOYEE REGISTRATION ACCEPTED');
        });
    },
    [token]
  );

  return {
    data,
    loading,
    actions: {
      deny,
      accept,
      fetchAll,
      fetchAllCancel,
      fetch,
      fetchCancel,
    },
  };
}

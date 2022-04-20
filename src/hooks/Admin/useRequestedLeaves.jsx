import axios from "axios";
import React from "react";
import { API_URL } from "../../const";
import useUser from "../user";

export function useRequestedLeaves() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const {
    state: { token },
  } = useUser();

  React.useEffect(() => {
    const URL = `${API_URL}/api/request/leave/?approved=False`;
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
  }, [token]);

  const update = React.useCallback(
    (data, id) => {
      return axios
        .patch(`${API_URL}/api/request/leave/${id}`, data, {
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

  const reject = React.useCallback(
    (id) => {
      return axios
        .delete(`${API_URL}/api/request/leave/${id}`, {
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

  return { data, loading, actions: { update, reject } };
}

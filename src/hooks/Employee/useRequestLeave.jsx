import axios from "axios";
import React from "react";
import { API_URL } from "../../const";
import useUser from "../user";

export default function useRequestLeave() {
  const {
    state: { token },
  } = useUser();

  const createRequest = React.useCallback(
    (data) => {
      return axios
        .post(`${API_URL}/api/request/leave/`, data, {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err;
        });
    },
    [token]
  );

  return createRequest;
}

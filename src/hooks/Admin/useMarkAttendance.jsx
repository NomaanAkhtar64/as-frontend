import axios from 'axios';
import React from 'react';
import { API_URL } from '../../const';
import useUser from '../user';

export function useMarkAttendance() {
  const {
    state: { token },
  } = useUser();

  const markAttendance = React.useCallback(
    (data) => {
      const URL = `${API_URL}/api/mark_attendance/${data.id}/`;
      return axios
        .post(URL, data, {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [token]
  );

  return markAttendance;
}

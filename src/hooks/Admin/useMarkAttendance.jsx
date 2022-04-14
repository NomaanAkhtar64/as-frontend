import axios from 'axios';
import React, { useCallback } from 'react';
import { API_URL } from '../../const';
import useUser from '../user';

export function useMarkAttendance() {
  const {
    state: { token },
  } = useUser();

  const markAttendance = useCallback(
    ({ date, mark, id }) => {
      const URL = `${API_URL}/api/mark_attendance/${id}/`;
      return axios
        .post(
          URL,
          {
            date,
            mark,
          },
          {
            headers: { Authorization: `Token ${token}` },
          }
        )
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

import axios from 'axios';
import React from 'react';
import { API_URL } from '../../const';
import useUser from '../user';

export function useChart() {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const {
        state: { token },
    } = useUser();

    React.useEffect(() => {
        const URL = `${API_URL}/api/chart-data/`;
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

    return {
        data,
        loading,
    };
}

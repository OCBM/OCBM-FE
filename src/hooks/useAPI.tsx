import { useState, useEffect } from 'react';
import axios, { AxiosHeaders } from 'axios';

type useAPIPropsType = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: object | Array<object>;
  headers?: AxiosHeaders;
};

const useAPI = ({ url = '', method = 'GET', body = {}, headers }: useAPIPropsType) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    axios({
      url,
      method,
      headers,
      data: body,
    })
      .then((response: any) => {
        setResponse(response.data);
      })
      .catch((error: any) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [method, url, body, headers]);

  return [loading, response, error];
};

export default useAPI;

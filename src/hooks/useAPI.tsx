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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response: any = await axios({
          url,
          method,
          headers,
          data: body,
        });
        setResponse(response);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [method, url, body, headers]);

  return [loading, response, error];
};

export default useAPI;

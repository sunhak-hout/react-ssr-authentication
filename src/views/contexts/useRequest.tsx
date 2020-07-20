import axios from 'axios';
import React, { createContext, useContext } from 'react';
import { useCookies } from 'react-cookie';

const RequestContext = createContext<RequestContextValue>(null as any);

export const useRequest = () => useContext(RequestContext);

export const RequestProvider: React.FC = ({ children }) => {
  const [cookies] = useCookies(['token']);
  const authToken = cookies['token'];

  const postRequest = async (options: PostRequestOptions) => {
    try {
      const result = await axios({
        method: 'POST',
        url: `${options.url}/`,
        data: options.data,
        headers: { Authorization: authToken },
      });
      return result.data;
    } catch (error) {
      return error.response.data;
    }
  };

  return <RequestContext.Provider value={{ postRequest }}>{children}</RequestContext.Provider>;
};

interface PostRequestOptions {
  url: string;
  data?: any;
}

export interface PostRequestResult {
  success: boolean;
  data?: { [key: string]: Object | Array<any> };
  error?: {
    code: number;
    name: string;
    message: string;
    errors?: { field: string; message: string }[];
  };
}

interface RequestContextValue {
  postRequest: (options: PostRequestOptions) => Promise<PostRequestResult>;
}

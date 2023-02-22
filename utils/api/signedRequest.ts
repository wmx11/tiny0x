import apiRoutes from '@/routes/api';
import axios from 'axios';

type SignedRequest<T> = {
  data: Object | T[];
  url: string;
  type: 'get' | 'post' | 'delete' | 'put';
  isFormData?: boolean;
  headers?: Record<string, string>;
};

export const signedRequest = async <T>({
  type,
  data,
  url,
  headers,
  isFormData,
}: SignedRequest<T>) => {

  const auth = await axios.post(apiRoutes.token);
  
  let authToken = '';

  if (auth.data) {
    authToken = auth.data.data;
  }

  return axios({
    url,
    method: type,
    data: data,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${authToken}`,
      ...headers,
      ...(isFormData ? { 'Content-Type': 'multipart/form-data' } : {}),
    },
  });
};

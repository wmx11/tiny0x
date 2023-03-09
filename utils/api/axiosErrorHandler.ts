import axios, { AxiosError } from 'axios';

const axiosErrorHandler = (
  error: Error | AxiosError | unknown,
  cb: (error: string) => void
) => {
  if (axios.isAxiosError(error)) {
    cb(error?.response?.data?.errorMessage);
  } else {
    cb(JSON.stringify((error as Error)?.message));
  }
};

export default axiosErrorHandler;

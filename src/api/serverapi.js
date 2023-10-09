import axios from 'axios';

// ErrorInterceptor
const onErrorResponse = async (error) => {
  if (axios.isAxiosError(error)) {
    const { status } = error.response;
    console.log('Error code', status);
  } else {
  }
  return Promise.reject(error);
};

const setupInterceptors = (instance) => {
  instance.interceptors.response.use(function (response) {
    return response;
  }, onErrorResponse);

  return instance;
};

const baseURL = process.env.REACT_APP_BaseURL;
const instance = axios.create();

instance.defaults.baseURL = baseURL;

const serverapi = setupInterceptors(instance);

export default serverapi;

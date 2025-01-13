import { ApiRoutes, BASE_API_URL, REQUEST_TIMEOUT } from '@/constants';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { getToken } from './token';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

type DetailMessageType = {
  type: string;
  message: string;
  details?: {
    property: string;
    value: string;
    messages: string[];
  }[];
};

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) =>
  !!StatusCodeMapping[response.status];

const createApi = () => {
  const api = axios.create({
    baseURL: BASE_API_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = error.response.data;
        const details = detailMessage.details;

        if (details?.length) {
          details.forEach((detail) => {
            detail.messages.forEach((message) => {
              toast.error(message);
            });
          });
        } else {
          if (
            !([ApiRoutes.Favorites, ApiRoutes.Login] as string[]).includes(
              `/${(error.request as XMLHttpRequest).responseURL
                .split('/')
                .pop()}`
            )
          ) {
            switch (error.response.status) {
              case StatusCodes.BAD_REQUEST:
                toast.error('Bad request');
                break;
              case StatusCodes.UNAUTHORIZED:
                toast.error('You have to be authorized');
                break;
              case StatusCodes.NOT_FOUND:
                toast.error('Not found');
                break;
              default:
                toast.error('Something went wrong');
            }
          }
        }
      }

      throw error;
    }
  );

  return api;
};

export default createApi;

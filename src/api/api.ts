import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

interface IApiCallParams {
  url: string;
  withAuth?: boolean;
  method?: AxiosRequestConfig['method'];
  data?: any;
}

export async function makeApiCall<T>({
  url,
  method = 'get',
  data,
}: IApiCallParams): Promise<AxiosResponse<T>> {
  return axios({
    method,
    url,
    data,
  });
}

import type { Method, AxiosError, AxiosResponse, AxiosRequestConfig, AxiosRequestHeaders } from "axios"

export type resultType = {
  accessToken?: string
}

export type RequestMethods = Extract<Method, "get" | "post" | "put" | "delete" | "patch" | "option" | "head">

export interface HttpError extends AxiosError {
  isCancelRequest?: boolean
}

export interface HttpResponse extends AxiosResponse {
  config: {
    headers: AxiosRequestHeaders
  }
}

export interface HttpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: HttpRequestConfig) => void
  beforeResponseCallback?: (response: HttpResponse) => void
}

export interface HttpTypes {
  request<T>(method: RequestMethods, url: string, param?: AxiosRequestConfig, axiosConfig?: HttpRequestConfig): Promise<T>
  post<T, P>(url: string, params?: T, config?: HttpRequestConfig): Promise<P>
  get<T, P>(url: string, params?: T, config?: HttpRequestConfig): Promise<P>
}

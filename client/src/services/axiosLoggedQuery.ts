import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import axiosInstance from "./client";
import type { BackendAuth, UserType } from "../types/auth";
import type { CarT } from "@/types/db";

export type AxiosParamsT = {
  url: string;
  method?: string | undefined;
  data?: BackendAuth | UserType | CarT | undefined;
  params?: AxiosResponse | undefined;
  headers?: AxiosRequestConfig["headers"];
};

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }: AxiosParamsT) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

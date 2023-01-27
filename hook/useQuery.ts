import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { TEmployee } from "../store/employeeSlice.type";

export const usePostEmployee = (key: QueryKey, url: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (payload: Omit<TEmployee, "id">) => {
      const { data } = await axios.post(url, payload);
      return data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(key),
      onSettled: () => {
        queryClient.invalidateQueries(key);
      },
    }
  );
};
export const usePutEmployee = (key: QueryKey, url: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (payload: TEmployee) => {
      const { id } = payload;
      await axios.put(`${url}/${id}`, payload);
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(key);
      },
      onSettled: () => {
        queryClient.invalidateQueries(key);
      },
    }
  );
};
export const useDeleteEmployee = (key: QueryKey, url: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: number) => {
      await axios.delete(`${url}/${id}`);
    },
    {
      onSuccess: () => queryClient.invalidateQueries(key),
      onSettled: () => {
        queryClient.invalidateQueries(key);
      },
    }
  );
};

import { useQuery, useMutation } from "react-query";
import { useMemo } from "react";
import { getAllContactUs, getAllInternational } from "../services/messages";

export const useContactUs = (queryParams?: Record<string, any>) => {
  const memoizedQueryParams = useMemo(() => {
    return Object.fromEntries(
      Object.entries(queryParams || {}).filter(([_, value]) => value !== "")
    );
  }, [queryParams]);
  return useQuery(
    ["AllContactUs", memoizedQueryParams],
    () => getAllContactUs(memoizedQueryParams),
    {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      cacheTime: 30 * 60 * 1000,
      retry: 1,
    }
  );
};

export const useAllInternational = (queryParams?: Record<string, any>) => {
  const memoizedQueryParams = useMemo(() => {
    return Object.fromEntries(
      Object.entries(queryParams || {}).filter(([_, value]) => value !== "")
    );
  }, [queryParams]);
  return useQuery(
    ["AllInternational", memoizedQueryParams],
    () => getAllInternational(memoizedQueryParams),
    {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      cacheTime: 30 * 60 * 1000,
      retry: 1,
    }
  );
};

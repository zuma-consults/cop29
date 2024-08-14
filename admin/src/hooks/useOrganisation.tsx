import { useQuery } from "react-query";
import { useMemo } from "react";
import { getAllDelegates } from "../services/delegate";

export const useOrganisation = (queryParams?: Record<string, any>) => {
  const memoizedQueryParams = useMemo(() => {
    return Object.fromEntries(
      Object.entries(queryParams || {}).filter(([_, value]) => value !== "")
    );
  }, [queryParams]);
  return useQuery(
    ["AllOrganisation", memoizedQueryParams],
    () => getAllDelegates(memoizedQueryParams),
    {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      cacheTime: 30 * 60 * 1000,
      retry: 1,
    }
  );
};

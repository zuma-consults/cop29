import { useQuery, useMutation, QueryClient } from "react-query";
import { createEvent, getAllEvents } from "../services/event";
import { toast } from "react-toastify";
import { useMemo } from "react";

const queryClient = new QueryClient();

export const useCreateEvent = () => {
  return useMutation(createEvent, {
    onSuccess: (result) => {
      if (result?.status) {
        queryClient.invalidateQueries("events");
        toast.success("Event created successfully");
      }
      queryClient.invalidateQueries("AllEvents");
    },
    onError: (error: any) => {
      toast.error(error?.message);
      queryClient.invalidateQueries("AllEvents");
    },
  });
};

// export const useGetProfile = () => {
//   return useQuery("profile", getAllEvents, {
//     onSuccess: (result) => {
//       const adminProfile = result?.data;
//       cookies.set("profile", adminProfile);
//     },
//   });
// };

export const useGetAllEvents = (queryParams: Record<string, any>) => {
  const memoizedQueryParams = useMemo(() => {
    // Only pass queryParams if it has values that are not empty strings
    return Object.fromEntries(
      Object.entries(queryParams).filter(([_, value]) => value !== "")
    );
  }, [queryParams]);

  return useQuery(
    ["AllEvents", memoizedQueryParams],
    () => getAllEvents(memoizedQueryParams),
    {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      cacheTime: 30 * 60 * 1000,
      retry: 1,
    }
  );
};

export const useGetCalender = () => {
  return useQuery(["events-calendar"], getAllEvents, {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    cacheTime: 30 * 60 * 1000,
    retry: 1,
  });
};

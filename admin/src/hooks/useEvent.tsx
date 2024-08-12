import { useQuery, useMutation, QueryClient } from "react-query";
import { createEvent, getAllEvents } from "../services/event";
import { useMemo } from "react";
import { Alert } from "@mui/material";

const queryClient = new QueryClient();

export const useCreateEvent = ({
  setOpen,
  refetchAllEvents,
}: {
  setOpen: (value: boolean) => void;
  refetchAllEvents: () => void;
}) => {
  return useMutation(createEvent, {
    onSuccess: (result) => {
      if (result?.status) {
        setOpen(false);
        refetchAllEvents();
        <Alert severity="success">Event Created Successfully</Alert>;
      }
    },
    onError: (error: any) => {
      <Alert severity="error">Error Creating Event</Alert>;
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

export const useGetAllEvents = (queryParams?: Record<string, any>) => {
  const memoizedQueryParams = useMemo(() => {
    return Object.fromEntries(
      Object.entries(queryParams || {}).filter(([_, value]) => value !== "")
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

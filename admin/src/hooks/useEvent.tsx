import { useQuery, useMutation } from "react-query";
import { createEvent, getAllEvents, getAllTimeSlots } from "../services/event";
import { useMemo } from "react";
import { toast } from "react-toastify";

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
        toast.success("Event Created Successfully");
        setOpen(false);
        refetchAllEvents();
      }
    },
    onError: (_error) => {
      toast.error("Event Creation failed. Please try again.");
    },
  });
};

export const useGetAllEvents = (queryParams?: Record<string, any>) => {
  const memoizedQueryParams = useMemo(() => {
    return Object.fromEntries(
      Object?.entries(queryParams || {})?.filter(([_, value]) => value !== "")
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

export const useGetAllTimeSlots = () => {
  return useQuery(["time-slots"], getAllTimeSlots, {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    cacheTime: 30 * 60 * 1000,
    retry: 1,
  });
};

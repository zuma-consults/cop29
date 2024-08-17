import { useQuery, useMutation } from "react-query";
import { createEvent, getEvents, getAllTimeSlots } from "../../services/events";
import { toast } from "react-toastify";

export const useGetEvents = () => {
  return useQuery("events", getEvents);
};

export const useCreateEvent = () => {
  return useMutation(createEvent, {
    onSuccess: (result) => {
      if (result?.status) {
        toast.success("Event Created Successfully");
      }
    },
    onError: (_error) => {
      toast.error("Event Creation failed. Please try again.");
    },
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
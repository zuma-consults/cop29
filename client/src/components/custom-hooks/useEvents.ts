import { useQuery, useMutation } from "react-query";
import { createEvent, getEvents } from "../../services/events";
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
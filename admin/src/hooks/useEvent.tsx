import { useQuery, useMutation } from "react-query";
import {
  approveCopEvent,
  approveEvent,
  createEvent,
  declineEvent,
  generateInvoice,
  getAllApplicants,
  getAllEvents,
  getAllTimeSlots,
} from "../services/event";
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
        toast.success("Meeting Created Successfully");
        setOpen(false);
        refetchAllEvents();
      }
    },
    onError: (_error) => {
      toast.error("Meeting Creation failed. Please try again.");
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

export const useApproveEvent = () => {
  return useMutation(approveEvent, {
    onSuccess: (result) => {
      if (result?.status) {
        toast.success("Meeting Approved Successfully");
      }
    },
    onError: () => {
      toast.error("Meeting Approval failed. Please try again.");
    },
  });
};

export const useDeclineEvent = () => {
  return useMutation(declineEvent, {
    onSuccess: (result) => {
      if (result?.status) {
        toast.success("Meeting Declined Successfully");
      }
    },
    onError: () => {
      toast.error("Meeting Decline failed. Please try again.");
    },
  });
};

export const useGenerateInvoice = () => {
  return useMutation(generateInvoice, {
    onSuccess: (result) => {
      if (result?.status) {
        toast.success("Invoice Generated Successfully");
      }
    },
    onError: () => {
      toast.error("Invoice Generation failed. Please try again.");
    },
  });
};

export const useGetAllCopApplicants = (queryParams?: Record<string, any>) => {
  const memoizedQueryParams = useMemo(() => {
    return Object.fromEntries(
      Object?.entries(queryParams || {})?.filter(([_, value]) => value !== "")
    );
  }, [queryParams]);
  return useQuery(
    ["AllCopApplicants", memoizedQueryParams],
    () => getAllApplicants(memoizedQueryParams),
    {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      cacheTime: 30 * 60 * 1000,
      retry: 1,
    }
  );
};

export const useApproveCopEvent = () => {
  return useMutation(approveCopEvent, {
    onSuccess: (result) => {
      if (result?.status) {
        toast.success("Applicant Approved Successfully");
      }
    },
    onError: () => {
      toast.error("Applicant Approval failed. Please try again.");
    },
  });
};

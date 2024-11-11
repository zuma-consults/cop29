import { useQuery, useMutation } from "react-query";
import {
  approveCopEvent,
  approveEvent,
  approveSideEvent,
  createEvent,
  createSideEvent,
  declineCopEvent,
  declineEvent,
  declineSideEvent,
  editTimslot,
  generateInvoice,
  getAllApplicants,
  getAllApprovedOrganizations,
  getAllEvents,
  getAllEventsForCalendar,
  getAllPavilions,
  getAllSideEvents,
  getAllTimeSlots,
  scheduleMeeting,
  uploadPayment,
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

export const useCreateSideEvent = ({
  setOpen,
  refetchAllEvents,
}: {
  setOpen: (value: boolean) => void;
  refetchAllEvents: () => void;
}) => {
  return useMutation(createSideEvent, {
    onSuccess: (result) => {
      if (result?.status) {
        toast.success("Side Event Created Successfully");
        setOpen(false);
        refetchAllEvents();
      }
    },
    onError: (_error) => {
      toast.error("Side Event Creation failed. Please try again.");
    },
  });
};

export const useScheduleMeeting = ({
  setOpenSchedule,
  refetchAllEvents,
}: {
  setOpenSchedule: (value: boolean) => void;
  refetchAllEvents: () => void;
}) => {
  return useMutation(scheduleMeeting, {
    onSuccess: (result) => {
      if (result?.status) {
        toast.success("Meeting Scheduled Successfully");
        setOpenSchedule(false);
        refetchAllEvents();
      }
    },
    onError: (_error) => {
      toast.error("Meeting Scheduling failed. Please try again.");
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

export const useGetAllSideEvents = (queryParams?: Record<string, any>) => {
  const memoizedQueryParams = useMemo(() => {
    return Object.fromEntries(
      Object?.entries(queryParams || {})?.filter(([_, value]) => value !== "")
    );
  }, [queryParams]);
  return useQuery(
    ["AllEvents", memoizedQueryParams],
    () => getAllSideEvents(memoizedQueryParams),
    {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      cacheTime: 30 * 60 * 1000,
      retry: 1,
    }
  );
};

export const useEditEvent = ({
  setOpen,
}: {
  setOpen: (value: boolean) => void;
}) => {
  return useMutation(
    ({ slotId, id }: { slotId: string; id: string }) => editTimslot(slotId, id),
    {
      onSuccess: (result) => {
        if (result?.status) {
          toast.success("Meeting Updated Successfully");
          setOpen(false);
          window.location.href = "/meetings";
        } else {
          toast.error(
            result.message || "Meeting Update failed. Please try again."
          );
        }
      },
      onError: (_error) => {
        toast.error("Meeting Update failed. Please try again.");
      },
    }
  );
};

export const useUploadPayment = ({
  setOpen,
}: {
  setOpen: (value: boolean) => void;
}) => {
  return useMutation((formData: FormData) => uploadPayment(formData), {
    onSuccess: (result) => {
      if (result?.status === true) {
        toast.success(
          result.message || "Proof of payment uploaded successfully"
        );
        setOpen(false);
        window.location.href = "/pavilion";
      } else {
        toast.error(result?.message || "Upload failed. Please try again.");
      }
    },
    onError: () => {
      toast.error("Upload failed. Please try again.");
    },
  });
};

export const useGetCalender = () => {
  return useQuery(["events-calendar"], getAllEventsForCalendar, {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    // cacheTime: 30 * 60 * 1000,
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

export const useGetAllPavilion = () => {
  return useQuery(["time-slots"], getAllPavilions, {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    cacheTime: 30 * 60 * 1000,
    retry: 1,
  });
};

export const useGetAllApprovedOrganizations = () => {
  return useQuery(["approved-organisations"], getAllApprovedOrganizations, {
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

export const useApproveSideEvent = () => {
  return useMutation(approveSideEvent, {
    onSuccess: (result) => {
      if (result?.status) {
        toast.success("Side Event Approved Successfully");
      }
    },
    onError: () => {
      toast.error("Side Event Approval failed. Please try again.");
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

export const useDeclineSideEvent = () => {
  return useMutation(declineSideEvent, {
    onSuccess: (result) => {
      if (result?.status) {
        toast.success("Side Event Declined Successfully");
      }
    },
    onError: () => {
      toast.error("Side Event Decline failed. Please try again.");
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

export const useDeclineCopEvent = () => {
  return useMutation(declineCopEvent, {
    onSuccess: (result) => {
      if (result?.status) {
        toast.success("Applicant Declined Successfully");
      }
    },
    onError: () => {
      toast.error("Applicant Decline failed. Please try again.");
    },
  });
};

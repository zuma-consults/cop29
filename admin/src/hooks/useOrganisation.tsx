import { useQuery, useMutation } from "react-query";
import { useMemo } from "react";
import {
  approveOrgansation,
  declineOrganisation,
  getAllNegotiators,
  getAllOrganisation,
} from "../services/organisation";
import { toast } from "react-toastify";

export const useOrganisation = (queryParams?: Record<string, any>) => {
  const memoizedQueryParams = useMemo(() => {
    return Object.fromEntries(
      Object.entries(queryParams || {}).filter(([_, value]) => value !== "")
    );
  }, [queryParams]);
  return useQuery(
    ["AllOrganisation", memoizedQueryParams],
    () => getAllOrganisation(memoizedQueryParams),
    {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      cacheTime: 30 * 60 * 1000,
      retry: 1,
    }
  );
};

export const useNegotiators = (queryParams?: Record<string, any>) => {
  const memoizedQueryParams = useMemo(() => {
    return Object.fromEntries(
      Object.entries(queryParams || {}).filter(([_, value]) => value !== "")
    );
  }, [queryParams]);
  return useQuery(
    ["AllNegotiators", memoizedQueryParams],
    () => getAllNegotiators(memoizedQueryParams),
    {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      cacheTime: 30 * 60 * 1000,
      retry: 1,
    }
  );
};

export const useApproveOrganisation = () => {
  return useMutation(approveOrgansation, {
    onSuccess: (result) => {
      if (result?.status) {
        toast.success("Organisation Approved Successfully");
      }
    },
    onError: () => {
      toast.error("Organisation Approval failed. Please try again.");
    },
  });
};

export const useDeclineOrganisation = () => {
  return useMutation(declineOrganisation, {
    onSuccess: (result) => {
      if (result?.status) {
        toast.success("Organisation Declined Successfully");
      }
    },
    onError: () => {
      toast.error("Organisation Decline failed. Please try again.");
    },
  });
};

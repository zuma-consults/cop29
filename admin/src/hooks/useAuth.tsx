import { useQuery, useMutation, QueryClient } from "react-query";
import { Cookies } from "react-cookie";
import {
  getAllProfile,
  getAllRoles,
  getProfile,
  login,
  logout,
  registerAdmin,
} from "../services/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const queryClient = new QueryClient();
const cookies = new Cookies();

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation(logout, {
    onSuccess: (result) => {
      if (result?.status) {
        queryClient.invalidateQueries("profile");
      }
      handleLogoutCleanup();
    },
    onError: (_error) => {
      handleLogoutCleanup();
    },
  });

  function handleLogoutCleanup() {
    cookies.remove("accessToken");
    cookies.remove("profile");
    toast.success("Logout Successful");
    navigate("/login");
  }
};

export const useAddAmin = ({
  refetchAllProfile,
  setOpen,
  reset,
}: {
  refetchAllProfile: () => void;
  setOpen: (value: boolean) => void;
  reset: () => void;
}) => {
  return useMutation(registerAdmin, {
    onSuccess: (result) => {
      if (result?.status) {
        reset();
        setOpen(false);
        refetchAllProfile();
        toast.success("Admin Added Successfully");
        queryClient.invalidateQueries("profile");
      }
    },
    onError: (_error) => {
      toast.error("Admin Addition failed. Please try again.");
      queryClient.invalidateQueries("profile");
    },
  });
};

export const useGetProfile = () => {
  return useQuery("profile", getProfile, {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    cacheTime: 30 * 60 * 1000,
    retry: 1,
    onSuccess: (result) => {
      const adminProfile = result?.data;
      cookies.set("profile", adminProfile);
    },
  });
};

export const useGetAllProfile = () => {
  return useQuery("Allprofile", getAllProfile, {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    cacheTime: 30 * 60 * 1000,
    retry: 1,
  });
};

export const useGetAllRoles = () => {
  return useQuery("Allroles", getAllRoles, {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    cacheTime: 30 * 60 * 1000,
    retry: 1,
  });
};

import { useQuery, useMutation, QueryClient } from "react-query";
import { Cookies } from "react-cookie";
import {
  getAllProfile,
  getAllRoles,
  getProfile,
  login,
  logout,
} from "../services/auth";
import { Alert } from "@mui/material";

const queryClient = new QueryClient();
const cookies = new Cookies();

export const useLogin = () => {
  return useMutation(login, {
    onSuccess: (result) => {
      if (result?.status) {
        const accessToken = result?.data;
        cookies.set("accessToken", accessToken, { path: "/" });
        queryClient.invalidateQueries("profile");
      }
    },
    onError: (error: any) => {
      <Alert severity="error">Error Logging In</Alert>;
      queryClient.invalidateQueries("profile");
    },
  });
};

export const useLogout = () => {
  return useMutation(logout, {
    onSuccess: () => {
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

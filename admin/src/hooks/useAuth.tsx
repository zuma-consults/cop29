import { useQuery, useMutation, QueryClient } from "react-query";
import { Cookies } from "react-cookie";
import { getAllProfile, getProfile, login, logout } from "../services/auth";
import { toast } from "react-toastify";

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
      toast.error(error?.message);
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

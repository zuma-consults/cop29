// useUser.ts
import { useQuery, useMutation, QueryClient } from "react-query";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import userService, { LoginData } from "../../services/userService";

// Create a new instance of QueryClient if it doesn't exist
const queryClient = new QueryClient();

// React Query hook for fetching all users

export const useGetUserByToken = () => {
  return useQuery(["token"], () => userService.getUsersByToken());
};

// React Query hook for user registration

export const useDeleteUser = () => {
  return useMutation((id: string) => userService.deleteUser(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};

export const useLogin = () => {
  const [, setCookie] = useCookies(["accessToken"]);
  return useMutation((data: LoginData) => userService.login(data), {
    onSuccess: (response) => {
      if (response && response.data && response.status === true) {
        setCookie("accessToken", response?.data);
        queryClient.invalidateQueries("login");
      } else {
        toast.error("Login error");
        return;
      }
    },
  });
};

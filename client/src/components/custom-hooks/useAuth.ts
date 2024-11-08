import { useQuery, useMutation, QueryClient } from "react-query";
import { login, logout, getProfile, register, orgRegister, activate, reset, forgot, resendActivation, negotiatorRegister, getPavillionSlots, getMySideEvents } from "../../services/auth";

// Create instances of QueryClient and Cookies
const queryClient = new QueryClient();



// Hook for login
export const useLogin = () => {
  return useMutation(login);
};

// Hook for registration
export const useRegister = () => {
  return useMutation(register, {
    onSuccess: () => {
      queryClient.invalidateQueries("profile");
    },
  });
};

export const useOrgRegister = () => {
  return useMutation(orgRegister, {
    onSuccess: () => {
      queryClient.invalidateQueries("profile");
    },
  });
};
export const useNegotiatorRegister = () => {
  return useMutation(negotiatorRegister, {
    onSuccess: () => {
      queryClient.invalidateQueries("profile");
    },
  });
};

// Hook for logout
export const useLogout = () => {
  return useMutation(logout, {
    onSuccess: () => {
      queryClient.invalidateQueries("profile");
    },
  });
};

// Hook for getting profile
export const useGetProfile = () => {
  return useQuery("profile", getProfile);
};

export const useGetPavillionSlots = () => {
  return useQuery("pavillion-slots", getPavillionSlots);
}

export const useGetMySideEvents = () => {
  return useQuery("side-event", getMySideEvents);
}

export const useActivate = () => {
  return useMutation(() => activate());
};

export const useReset = () => {
  return useMutation((data: { password: string, confirmPassword: string }) => reset(data));
};

export const useForgot = () => {
  return useMutation((data: { email: string }) => forgot(data));
};

export const useResendActivation = () => {
  return useMutation((data: { email: string }) => resendActivation(data));
};
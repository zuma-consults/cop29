import { useQuery, useMutation, QueryClient } from "react-query";
import { getEvents } from "../../services/events";
const queryClient = new QueryClient();


// export const useLogout = () => {
//   return useMutation(logout, {
//     onSuccess: () => {
//       queryClient.invalidateQueries("profile");
//     },
//   });
// };

// Hook for getting profile
export const useGetEvents = () => {
  return useQuery("events", getEvents);
};

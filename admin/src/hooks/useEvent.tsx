import { useQuery, useMutation, QueryClient } from "react-query";
import { Cookies } from "react-cookie";
import { getAllEvents } from "../services/event";

const queryClient = new QueryClient();
const cookies = new Cookies();

// export const useLogin = () => {
//   return useMutation(login, {
//     onSuccess: (result) => {
//       if (result?.status) {
//         const accessToken = result?.data;
//         cookies.set("accessToken", accessToken, { path: "/" });
//         queryClient.invalidateQueries("profile");
//       }
//     },
//     onError: (error: any) => {
//       toast.error(error?.message);
//       queryClient.invalidateQueries("profile");
//     },
//   });
// };

// export const useGetProfile = () => {
//   return useQuery("profile", getAllEvents, {
//     onSuccess: (result) => {
//       const adminProfile = result?.data;
//       cookies.set("profile", adminProfile);
//     },
//   });
// };

export const useGetAllEvents = (queryParams: Record<string, any>) => {
  return useQuery(
    ["AllEvents", queryParams],
    () => getAllEvents(queryParams),
    {}
  );
};

export const useGetCalender = () => {
  return useQuery(["events-calender"], () => getAllEvents());
};

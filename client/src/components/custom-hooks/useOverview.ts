import { useQuery } from "react-query";
import { getOverview } from "../../services/overview";

export const useGetOverview = () => {
    return useQuery("overview", getOverview);
  };
import { useMutation } from "react-query";
import { addDelegatestoOrg } from "../../services/organisation";
import { toast } from "react-toastify";

export const useAddDelegate = () => {
  return useMutation(
    ({ id, data }: { id: string; data: any }) => addDelegatestoOrg({id, data}),
    {
      onSuccess: () => {
        toast.success("Delegate added successfully");
      },
      onError: () => {
        toast.error("Failed to add delegate. Please try again.");
      },
    }
  );
};

import { useMutation } from "react-query";
import { addDelegatestoOrg } from "../../services/organisation";

export const useAddDelegate = () => {
  return useMutation(
    ({ id, data }: { id: string; data: any }) => addDelegatestoOrg({id, data})
  );
};

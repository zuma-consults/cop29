import { useMutation } from "react-query";
import { addDelegatestoOrg, bookSideEvent } from "../../services/organisation";

export const useAddDelegate = () => {
  return useMutation(
    ({ id, data }: { id: string; data: any }) => addDelegatestoOrg({id, data})
  );
};

export const useBookSideEvent = () => {
  return useMutation(
    ({ data }: { data: any }) => bookSideEvent({data})
  );
};

import { useMutation } from "react-query";
import { contactUs, intOrg } from "../../services/contact-int";

export const useContact = () => {
    return useMutation(contactUs);
};
export const useIntOrg = () => {
    return useMutation(intOrg);
};
  
import { toast } from "react-toastify";
import { request } from "../util/api";

export const contactUs = async (data: any) => {
  try {
    const config = {
      method: "post",
      url: "contact",
      data,
    };
    const responseData = await request(config);
    return responseData;
  } catch (error: any) {
    console.log(error);
    toast.error(`${error?.response?.data?.message || error?.message}`);
  }
};
export const intOrg = async (data: any) => {
  try {
    const config = {
      method: "post",
      url: "international",
      data,
    };
    const responseData = await request(config);
    return responseData;
  } catch (error: any) {
    console.log(error);
    toast.error(`${error?.response?.data?.message || error?.message}`);
  }
};

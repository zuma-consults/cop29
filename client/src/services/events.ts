import { toast } from "react-toastify";
import { request } from "../util/api";

export const getEvents = async (data: any) => {
  try {
    const config = {
      method: "get",
      url: "events",
      data,
    };
    const responseData = await request(config);
    console.log(responseData, "respond");
    // if (responseData) {
    //   toast.success("User Registered !");
    // }
    return responseData;
  } catch (error: any) {
    console.error(error);
    return undefined
  }
};

import { request } from "../utils/api";

export const getAllContactUs = async (params?: Record<string, any>) => {
  try {
    const config = {
      method: "get",
      url: "meeting",
      params,
    };
    const responseData = await request(config);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const getAllInternational = async (params?: Record<string, any>) => {
  try {
    const config = {
      method: "get",
      url: "meeting",
      params,
    };
    const responseData = await request(config);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

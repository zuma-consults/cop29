import { request } from "../utils/api";

export const getAllDelegates = async (params?: Record<string, any>) => {
    try {
      const config = {
        method: "get",
        url: "users",
        params,
      };
      const responseData = await request(config);
      return responseData;
    } catch (error) {
      console.log(error);
    }
  };
import { request } from "../util/api";

export const getOverview = async () => {
    try {
      const config = {
        method: "get",
        url: "overview",
      };
      const responseData = await request(config);
      return responseData;
    } catch (error: any) {
      console.error(error);
      return undefined
    }
  };
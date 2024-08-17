
import { request } from "../util/api";

export const getEvents = async (data: any) => {
  try {
    const config = {
      method: "get",
      url: "events",
      data,
    };
    const responseData = await request(config);
    return responseData;
  } catch (error: any) {
    console.error(error);
    return undefined
  }
};

export const createEvent = async (data: any) => {
  try {
    const config = {
      method: "post",
      url: "event",
      data,
    };
    const responseData = await request(config);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTimeSlots = async () => {
  try {
    const config = {
      method: "get",
      url: "slots",
    };

    const responseData = await request(config);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

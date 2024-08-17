import { request } from "../utils/api";

export const createEvent = async (data: any) => {
  try {
    const config = {
      method: "post",
      url: "event/admin",
      data,
    };
    const responseData = await request(config);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const getAllEvents = async (params?: Record<string, any>) => {
  try {
    const config = {
      method: "get",
      url: "events",
      params,
    };
    const responseData = await request(config);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCalender = async () => {
  try {
    const config = {
      method: "get",
      url: "events",
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

export const approveEvent = async (id: number) => {
  try {
    const config = {
      method: "put",
      url: `status/event/${id}`,
      data: { status: "approved" },
    };
    const responseData = await request(config);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const declineEvent = async (id: number) => {
  try {
    const config = {
      method: "put",
      url: `status/event/${id}`,
      data: { status: "decline" },
    };
    const responseData = await request(config);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

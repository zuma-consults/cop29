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
      data: { status: "rejected" },
    };
    const responseData = await request(config);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const generateInvoice = async (id: number) => {
  try {
    const config = {
      method: "post",
      url: `invoice/event/${id}`,
      data: { status: "decline" },
    };
    const responseData = await request(config);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const getAllApplicants = async (params?: Record<string, any>) => {
  try {
    const config = {
      method: "get",
      url: "applicants",
      params,
    };
    const responseData = await request(config);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const approveCopEvent = async (id: number) => {
  try {
    const config = {
      method: "put",
      url: `approve/${id}`,
      data: { copApproved: "approved" },
    };
    const responseData = await request(config);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const declineCopEvent = async (id: number) => {
  try {
    const config = {
      method: "put",
      url: `approve/${id}`,
      data: { copApproved: "rejected" },
    };
    const responseData = await request(config);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

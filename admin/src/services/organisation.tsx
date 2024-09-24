import { request } from "../utils/api";

export const getAllOrganisation = async (params?: Record<string, any>) => {
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

export const getAllNegotiators = async (params?: Record<string, any>) => {
  try {
    const config = {
      method: "get",
      url: "negotiators",
      params,
    };
    const responseData = await request(config);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const approveOrgansation = async (id: number) => {
  try {
    const config = {
      method: "put",
      url: `user/${id}`,
      data: { status: "approved" },
    };
    const responseData = await request(config);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const declineOrganisation = async (id: number) => {
  try {
    const config = {
      method: "put",
      url: `user/${id}`,
      data: { status: "decline" },
    };
    const responseData = await request(config);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

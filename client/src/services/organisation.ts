
import { request } from "../util/api";


export const addDelegatestoOrg = async ({id, data}: {id: string; data:any}) => {
  try {
    const config = {
      method: "put",
      url: `add-delegate/${id}`,
      data,
    };
    const responseData = await request(config);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};



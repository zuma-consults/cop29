// user.service.ts
import { AxiosRequestConfig } from "axios";
import { request } from "../utils/request";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string[];
}

export interface LoginData {
  username: string;
  password?: string;
}

export interface UsersResponse {
  users: User[];
}

class UserService {
  public async getUsersByToken() {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: `/token`,
    };
    const response = await request(options);
    return response;
  }

  public async deleteUser(id: string) {
    const options: AxiosRequestConfig = {
      method: "DELETE",
      url: `/user/${id}`,
    };
    return request(options);
  }

  public async login(data: LoginData) {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: "/login/staff",
      data,
    };

    return await request(options);
  }

  public async updateUser(id: string, data: object) {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `/user/${id}`,
      data,
    };

    return await request(options);
  }
}

export default new UserService();

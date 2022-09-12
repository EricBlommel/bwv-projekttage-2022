import {HalResource} from "./hal.type";

export interface User {
  accessToken?: string;
  email?: string;
  id?: string;
  roles?: Role[];
  tokenType?: string;
  username?: string;
}

export interface UserRequest {
  id?: string;
}

export interface UserResponse {
  id?: string;
  username?: string;
}

export interface UserResource extends HalResource{
  id?: string;
  email?: string;
  username?: string;
  roles?: Role[];
}

export interface Role {
  id?: number;
  name?: roleName
}

export type roleName = "ROLE_USER" | "ROLE_ADMIN";

export const roleNames: Role[] = [{id: 1, name: "ROLE_USER"}, {id: 2, name: "ROLE_ADMIN"}];
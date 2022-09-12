import {HalResource} from "./hal.type";
import {UserResource, UserResponse} from "./user.type";

export interface ItemRequest {
  name?: string;
  userId?: string;
}

export interface ItemResponse {
  id?: string;
  name?: string;
  user?: UserResponse;
}

export interface ItemResource extends HalResource {
  id?: string;
  name?: string;
  user?: UserResource;
}
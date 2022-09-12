import {HalResource} from "./hal.type";
import {UserResource, UserResponse} from "./user.type";
import {ItemResource, ItemResponse} from "./item.type";
import {Dayjs} from "dayjs";

export interface EventRequest {
  name?: string;
  beginsAt?: Dayjs | null;
  description?: string;
  creatorId?: string;
}

export interface EventResponse extends HalResource {
  id?: string;
  name?: string;
  beginsAt?: Date;
  description?: string;
  creator?: UserResponse;
  users?: UserResponse[];
  items?: ItemResponse[];
}

export interface EventResource extends HalResource {
  id?: string;
  name?: string;
  beginsAt?: Date;
  description?: string;
  creator?: {};
  users?: UserResource[];
  items?: ItemResource[];
}
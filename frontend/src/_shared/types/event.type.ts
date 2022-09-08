import {HalResource} from "./hal.type";
import {UserResource} from "./user.type";
import {ItemResource} from "./item.type";

export interface EventResource extends HalResource {
  id?: string;
  name?: string;
  beginsAt?: Date;
  description?: string;
  creator?: {};
  users?: UserResource[];
  items?: ItemResource[];
}
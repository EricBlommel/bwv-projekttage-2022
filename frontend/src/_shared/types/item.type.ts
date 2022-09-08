import {HalResource} from "./hal.type";
import {UserResource} from "./user.type";

export interface ItemResource extends HalResource {
  id?: string;
  name?: string;
  user?: UserResource;
}
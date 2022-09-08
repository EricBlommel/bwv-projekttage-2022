import {HalResource} from "./hal.type";

export interface UserResource extends HalResource {
  id?: string;
  nickname?: string;
}
import {HalResource} from "./hal.type";

export interface EventResource extends HalResource {
  id?: string;
  name?: string;
  beginsAt?: Date;
  description?: string;
  creator?: {};
  users?: {}[];
  items?: {}[];
}
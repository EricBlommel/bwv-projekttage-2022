import {HalResource} from "./hal.type";

export interface TestResource extends HalResource {
  text?: string;
}
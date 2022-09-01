import {HalResource} from "./hal.type";

export interface TestResponse extends HalResource {
  text?: string;
}
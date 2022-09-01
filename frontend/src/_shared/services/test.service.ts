import {HalResource} from "../types/hal.type";
import {backend} from "../global/axios";
import {AxiosResponse} from "axios";

export default class TestService<TestResource extends HalResource> {

  public getTest(): Promise<HalResource & TestResource[]> {
    return backend
      .get(`/api/test`)
      .then((response: AxiosResponse<HalResource & TestResource[]>) => response.data);
  }
}

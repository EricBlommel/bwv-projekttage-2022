import {HalResource} from "../types/hal.type";
import {backend} from "../global/axios";
import {AxiosResponse} from "axios";

export default class EventService<EventResource extends HalResource> {

  public getAll(): Promise<HalResource & EventResource[]> {
    return backend
      .get(`/api/event`)
      .then((response: AxiosResponse<HalResource & EventResource[]>) => response.data);
  }


  public getEvent(id: string): Promise<HalResource & EventResource> {
    return backend
      .get(`/api/event/get/` + id)
      .then((response: AxiosResponse<HalResource & EventResource>) => response.data);
  }

  public createEvent(event: EventResource): Promise<HalResource & EventResource> {
    return backend
      .post(`/api/event/create`, event)
      .then((response: AxiosResponse<HalResource & EventResource>) => response.data);
  }
}

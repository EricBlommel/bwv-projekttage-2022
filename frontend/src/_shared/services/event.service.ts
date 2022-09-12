import {HalResource} from "../types/hal.type";
import {backend} from "../global/axios";
import {AxiosResponse} from "axios";
import authHeader from "./auth-header";
import {EventRequest} from "../types/event.type";
import {ItemRequest} from "../types/item.type";
import {UserRequest} from "../types/user.type";

export default class EventService<EventResource extends HalResource> {

  public getAll(): Promise<HalResource & EventResource[]> {
    return backend
      .get(`/api/event`, { headers: authHeader()})
      .then((response: AxiosResponse<HalResource & EventResource[]>) => response.data);
  }

  public getEvent(id: string): Promise<HalResource & EventResource> {
    return backend
      .get(`/api/event/get/` + id)
      .then((response: AxiosResponse<HalResource & EventResource>) => response.data);
  }

  public createEvent(event: EventRequest): Promise<HalResource & EventResource> {
    return backend
      .post(`/api/event/create`, event, { headers: authHeader()})
      .then((response: AxiosResponse<HalResource & EventResource>) => response.data);
  }

  public addItemToEvent(id: string, item: ItemRequest): Promise<HalResource & EventResource> {
    return backend
      .post(`/api/event/add/item/` + id, item, { headers: authHeader()})
      .then((response: AxiosResponse<HalResource & EventResource>) => response.data);
  }

  public addUserToEvent(id: string, user: UserRequest): Promise<HalResource & EventResource> {
    return backend
      .post(`/api/event/add/user/` + id, user, { headers: authHeader()})
      .then((response: AxiosResponse<HalResource & EventResource>) => response.data);
  }
}

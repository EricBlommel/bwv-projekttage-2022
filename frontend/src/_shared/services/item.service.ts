import {HalResource} from "../types/hal.type";
import {backend} from "../global/axios";
import {AxiosResponse} from "axios";
import authHeader from "./auth-header";
import {ItemRequest} from "../types/item.type";

export default class ItemService<EventResource extends HalResource> {

  public deleteById(id: string): Promise<HalResource & string> {
    return backend
      .delete(`/api/item/delete/` + id, { headers: authHeader()})
      .then((response: AxiosResponse<HalResource & string>) => response.data);
  }

  public updateItemAddUser(id: string, userId: string): Promise<HalResource & string> {
    return backend
      .post(`api/item/update/add/user/` + id, userId, { headers: authHeader()})
      .then((response: AxiosResponse<HalResource & string>) => response.data);
  }

  public updateItemRemoveUser(id: string): Promise<HalResource & string> {
    return backend
      .post(`api/item/update/remove/user/` + id, { headers: authHeader()})
      .then((response: AxiosResponse<HalResource & string>) => response.data);
  }

}

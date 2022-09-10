import axios from "axios";
import {Role, User} from "../types/user.type";

class AuthService {
  login(username: string, password: string) {
    return axios.post(process.env.REACT_APP_API_BASE_URL + "/api/auth/signin", {
      username,
      password
    })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          window.location.reload();
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    window.location.reload();
  }

  register(username: string, email: string, password: string) {
    return axios.post(process.env.REACT_APP_API_BASE_URL + "/api/auth/signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('user')!);
  }

  isAdmin(): boolean {
    return localStorage.getItem('user') ? this.getCurrentUser().roles!.some((value: Role) => value === "ROLE_ADMIN") : false;
  }
}

export default new AuthService();

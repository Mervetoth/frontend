import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + "signin", { email, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  // Updated register method to accept additional fields
  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    gender: string,
    address: string,
    dateOfBirth: Date | null,
    roles: string[],
    phoneNumber: string,
    userType: string
  ) {
    return axios.post(API_URL + "signup", {
      firstName,
      lastName,
      email,
      password,
      address,
      dateOfBirth,
      gender,
      phoneNumber,
      userType,
      roles,
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  }
}

export default new AuthService();

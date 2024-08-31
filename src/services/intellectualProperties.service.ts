import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/intellectualProperties/";

class IntellectualPropertiesService {
  // Get all intellectual properties
  getAll() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  // Get a single intellectual property by ID
  getById(id: string) {
    return axios.get(`${API_URL}${id}`, { headers: authHeader() });
  }

  // Create a new intellectual property
  create(data: any) {
    return axios.post(API_URL, data, { headers: authHeader() });
  }

  // Update an intellectual property by ID
  update(id: string, data: any) {
    return axios.put(`${API_URL}${id}`, data, { headers: authHeader() });
  }

  // Delete an intellectual property by ID
  delete(id: string) {
    return axios.delete(`${API_URL}${id}`, { headers: authHeader() });
  }
}

export default new IntellectualPropertiesService();

import { API_BASE_URL } from "@/shared/config/api";
import axios from "axios";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

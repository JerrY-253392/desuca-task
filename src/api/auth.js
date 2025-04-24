import axios from "axios";
import { ADMIN_BASE_URL, AUTH_BASE_URL, USER_BASE_URL } from "../constants";

export const login = async (data) => {
  try {
    const response = await axios.post(AUTH_BASE_URL + "/signin", data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
export const createUser = async (data) => {
  try {
    const response = await axios.post(USER_BASE_URL + "/create", data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(USER_BASE_URL + "/getall");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getMyDetails = async () => {
  try {
    const response = await axios.get(ADMIN_BASE_URL + "/who-am-I");
    console.log("response", response);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateProfile = async () => {
  try {
    const response = await axios.get(AUTH_BASE_URL + "/updateProfile");
    console.log("response", response);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

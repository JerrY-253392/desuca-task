import axios from "axios";
import { MANAGER_BASE_URL } from "../constants";

export const UpdateManager = async (data) => {
  try {
    const response = await axios.patch(
      MANAGER_BASE_URL + `/update/${data.id}`,
      { managedUsers: data.data }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getManagerTask = async (data) => {
  try {
    const response = await axios.get(
      MANAGER_BASE_URL + `/getTaskById/${data}`
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getManager = async (data) => {
  try {
    const response = await axios.get(MANAGER_BASE_URL + `/getbyid/${data}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const createTask = async (data) => {
    try {
        const response = await axios.post(MANAGER_BASE_URL + `/create`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}
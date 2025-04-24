import axios from "axios";
import { TASK_BASE_URL } from "../constants";

export const createTask = async (data) => {
  try {
    const response = await axios.post(TASK_BASE_URL + "/create", data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
export const getAllTaskOfUser = async (data) => {
  try {
    const response = await axios.get(TASK_BASE_URL + "/getusertask", data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getAllTask = async (data) => {
  try {
    const response = await axios.get(TASK_BASE_URL + `/getAll`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const deleteTaskById = async (data) => {
  try {
    const response = await axios.delete(TASK_BASE_URL + `/delete/${data}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateTask = async (data) => {
  try {
    const response = await axios.patch(TASK_BASE_URL + `/update/${data.id}`, {
      assignedTo: data.assignedTo,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

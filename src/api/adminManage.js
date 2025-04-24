import axios from "axios";
import { USER_BASE_URL } from "../constants";

export const deleteUser = async (data) => {
    console.log(data)
    try {
    const response = await axios.delete(USER_BASE_URL + `/delete/${data}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getUserDetail = async (data) => {
  try {
    const response = await axios.get(USER_BASE_URL + `/who-am-I`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}
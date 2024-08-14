import axios from "axios";

interface registerInterface {
  email: string,
  username: string,
  password: string
}
export const registerUser = async (body: registerInterface) => {
  const response = await axios.post(`${process.env.API_URL}/register`, body)
  return response;
}

interface loginInterface {
  email: string,
  password: string
}
export const loginUser = async (body: loginInterface) => {
  const response = axios.post(`${process.env.API_URL}/login`, body)
  return response;
}


import axios from "axios";

interface noteInterface {
  title: string,
  description: string,
  date: Date
}
export const addNote = async (body: noteInterface) => {
  const response = await axios.post(`${process.env.API_URL}/tasks`, body)
  return response;
}

export const getNotes = async () => {
  const response = await axios.get(`${process.env.API_URL}/tasks`)
  return response.data;

}

export const deleteNote = async (id: string) => {
  const response = await axios.delete(`${process.env.API_URL}/tasks/${id}`)
  return response.data;
}
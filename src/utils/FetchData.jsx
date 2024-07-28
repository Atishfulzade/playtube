import axios from "axios";
const Base_Url = "https://youtube-data8.p.rapidapi.com/";
const options = {
  method: "GET",

  headers: {
    "x-rapidapi-key": "6763980c17msh6204558b8766f1ep125f62jsn3332e24212a0",
    "x-rapidapi-host": "youtube-data8.p.rapidapi.com",
  },
};
export async function fetchData(url) {
  try {
    const response = await axios.get(`${Base_Url}/${url}`, options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

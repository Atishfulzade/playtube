import axios from "axios";
const Base_Url = "https://youtube-data8.p.rapidapi.com/";
const api_key_yt = import.meta.env.VITE_API_YT_KEY;
const options = {
  method: "GET",

  headers: {
    "x-rapidapi-key": api_key_yt,
    "x-rapidapi-host": "youtube-data8.p.rapidapi.com",
  },
};
export async function fetchData(url) {
  try {
    const response = await axios.get(`${Base_Url}/${url}`, options);
    console.log(api_key_yt);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

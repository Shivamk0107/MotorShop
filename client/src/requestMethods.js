import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
 //const TOKEN =
   //JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//.accessToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTZmY2QyZTc0ZjljNGY1YTk3NzFiMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3OTQxNzc3NCwiZXhwIjoxNjc5Njc2OTc0fQ.L3rk5B1hGuLpJ5FBOtPpzaC6PYIXbE4gEPW4UlnhywU";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});

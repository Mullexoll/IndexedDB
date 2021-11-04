import axios from "axios";

const instance = axios.create({
   withCredentials: true,
   baseURL: "https://jsonplaceholder.typicode.com/",
});

export const usersAPI = {
   async getUsers() {
      return instance.get(`users`);
   },
};


import axios from "axios";

export const inventarioAPI = axios.create({
    baseURL:'http://localhost:8080'
})
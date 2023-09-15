import axios from "axios";

const ApiService = axios.create({
  baseURL: "https://m6n8y4by8e.execute-api.us-east-1.amazonaws.com/dev", // Replace with your actual backend URL
  timeout: 80000,
});

export default ApiService;

import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

export const Request = {
  post: async (url, data) => {
    const config = data?.config;
    const headers = data?.config?.headers;
    console.log(url)
    return await axios.post(`${url}`, data.payload, {
      ...config,
      headers: {
        ...headers,
        "Access-Control-Allow-Origin": process.env.REACT_APP_APP_URL,
      },
    });
  },

  get: async (url, config = {}) => {
    const headers = config?.headers;
    console.log(url);
    return await axios.get(`${baseUrl}/${url}`, {
      ...config,
      headers: {
        ...headers,
        "Access-Control-Allow-Origin": process.env.REACT_APP_APP_URL,
      },
    });
  },
};

import config from "../config.json";

const get = (url) => {
  return new Promise((resolve) => {
    fetch(`http://localhost:${config.SERVER_PORT}${url}`, {
      method: "get",
      headers: {
        "content-type" : "application/json",
      }
    })
    .then(res => res.json())
    .then(res => resolve(res));
  });
};

const post = (url, content) => {
  return new Promise((resolve) => {
    fetch(`http://localhost:${config.SERVER_PORT}${url}`, {
      method: "post",
      headers: {
        "content-type" : "application/json",
      },
      body: JSON.stringify(content)
    })
    .then(res => res.json())
    .then(res => {
      resolve(res);
    });
  });
};

const apiService = {
  get,
  post
};
export default apiService;
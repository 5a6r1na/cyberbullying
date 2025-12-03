//apis.js
import axios from "axios";

// [TODO]: Update with Gawon's LLM server
const baseURL = "http://localhost:8081/api";
const instance = axios.create({
  baseURL: baseURL,
});

export const getLLMResponse = (data) => {
  return instance.post(
    `http://localhost:5173/api/getLLMResponse`,
    // `http://localhost:8080/getLLMResponse`,
    // `${serverDomain}/getLLMResponse`,
    // `getLLMResponse` // [TODO]: open when implemented
    data
  );
};

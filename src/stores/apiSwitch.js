//apiSwitch.js
import { getLLMResponse } from "../services/api";
export const apiSwitch = async (apiKey, req) => {
  let res = {};
  try {
    switch (apiKey) {
      //個案管理
      case "getLLMResponse":
        res = await getLLMResponse(req);
        break;
      default:
    }
    // console.error('res', res);
  } catch (error) {
    throw error;
  } finally {
    // console.error('res', res);
  }
  return res;
};

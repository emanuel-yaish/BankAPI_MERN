import axios from "axios";
import { CURRENT_URL } from "../constants.js/global.constants";

export default axios.create({
  baseURL: CURRENT_URL,
});

import { useRoutes } from "react-router-dom";
// Constants
import { USER } from "../utils/userConstants";
import { getLocalStorageItem } from "../utils/getLocalStorage";
import {
  MainRedirect,
} from "./router";

const MainRoute = () => {
  return useRoutes(MainRedirect);
};

export default MainRoute;

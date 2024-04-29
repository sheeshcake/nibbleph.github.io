import React from "react";
import { Navigate } from "react-router-dom";

// Layout
import DashboardLayout from "../layouts/dashboard";
import CompactLayout from "../layouts/compact";

import {
  LandingViewElement,
} from "./elements";


export const MainRedirect = [
  { path: "/", element: <LandingViewElement /> },
];

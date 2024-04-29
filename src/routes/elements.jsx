/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
import { Suspense, lazy } from "react";
// components
import LoadingScreen from "../components/loading-screen";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

export const LandingViewElement = Loadable(
  lazy(() => import("../pages/landing/landing-view"))
);


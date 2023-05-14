import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Heatmap from "./pages/threeJS.jsx";
import Today from "./pages/Today.jsx";
import Insert from "./pages/Insert.jsx";
import Three from "./pages/threeJS";
import PredictionPage from "./pages/prediction.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/heatmap",
        element: <Heatmap />,
      },

      {
        path: "/today",
        element: <Today />,
      },
      {
        path: "/insert",
        element: <Insert />,
      },
      {
        path: "/three",
        element: <Three />,
      },
      {
        path: "/prediction",
        element: <PredictionPage />,
      },
    ],
  },
]);

export default router;

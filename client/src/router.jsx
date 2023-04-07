import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Heatmap from "./pages/threeJS.jsx";
import Today from "./pages/Today.jsx";
import Insert from "./pages/Insert.jsx";
import Three from "./pages/threeJS";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    
      {
        path: "/heatmap",
        element: < Heatmap/>,
      },
      
      {
        path: "/today",
        element: < Today/>,
      },
      {
        path: "/insert",
        element: < Insert/>,
      },
      {
        path: "/three",
        element: < Three/>,
      },
    
    ],
  },
]);

export default router;
import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./screens/home/Home";
import Register from "./screens/register/Register";
import Login from "./screens/login/Login";
import Header from "./components/header/Header";
import Report from "./screens/report/Report";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Header />
        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/report",
          element: <Report />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";

const router = createBrowserRouter([
  {
    element: <Signup />,
    path: "/",
  },
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <Home />,
    path: "/home",
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

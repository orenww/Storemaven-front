import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Game from "./components/Game";
import HomePage from "./components/HomePage";
import UserContext from "./store/user-context";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/game", element: <Game /> },
]);

function App() {
  return (
    <UserContext.Provider
      value={{
        userName: "",
        numOfSuccess: 0
      }}
    >
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;

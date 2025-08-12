import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Landing/Home";
import { Provider } from "react-redux";
import { store } from "./Store/Store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Auth from "./Auth/Auth";
import { Toaster } from "react-hot-toast";
import Profile from "./Pages/Profile/Profile";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Landing/Home";
import { Provider } from "react-redux";
import { store } from "./Store/Store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Auth from "./Auth/Auth";
import { Toaster } from "react-hot-toast";
import Profile from "./Pages/Profile/Profile";
import Layout from "./Layout/layout";
import Dashboard from './Pages/Home/Dashboard';
import About from './Pages/Home/About';
import All_resume from './Pages/Home/All_resume';
import Ats from "./Pages/Home/Ats";
import Resume from "./Pages/Resume/Resume";
import Header from "./Pages/Resume/FromData/Header";
import ProfilePage from './Pages/Resume/FromData/Profile';

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
    {
      path: "/resume/:id",
      element: <Resume />,
      children:[
        {
          index:true,
          element:<Header/>
        },
        {
          path:"profile",
          element:<ProfilePage/>
        },
      ]
    },
    {
      path:"/dashboard",
      element:<Layout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "all_resume",
          element: <All_resume />,
        },
        {
          path: "review",
          element: <Ats />,
        },
      ],
    }
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

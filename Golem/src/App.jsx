import { useEffect, useState } from 'react';
import './App.css';
import ResponsiveAppBar from './components/Navbar/ResponsiveAppBar';
import Footer from './components/Footer/footer';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from './stores/store.js';
import ProtectedRoute from './ProtectedRoute';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage"
import LoginForm from './pages/Authentication/LoginForm.jsx';
import RegisterForm from './pages/Authentication/RegisterForm.jsx';
import VirtualCoach from './pages/VirtualCoach.jsx';
import Sim from './pages/Sim.jsx';
import AIorHumanGame from './pages/AIorHumanGame.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/virtual-coach",
    element: <VirtualCoach />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/sim",
    element: <Sim />,
  },
  {
    path: "/AIorHumanGame",
    element: <AIorHumanGame />,
  }
]);

const App = observer(function App()
{
  const { commonStore, userStore } = useStore();
  const [user, setUser] = useState({});

  // useEffect(() =>
  // {
  //   if (commonStore.token)
  //   {
  //     try
  //     {
  //       const fetchData = async () =>
  //       {
  //         const userData = await agent.Account.current();
  //         setUser(userData);
  //       };
  //       fetchData();
  //     } catch (error)
  //     {
  //       console.error(error);
  //     } finally
  //     {
  //       commonStore.setAppLoaded();
  //     }
  //   } else
  //   {
  //     commonStore.setAppLoaded();
  //   }
  // }, [commonStore, userStore]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
});

export default App

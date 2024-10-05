import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider , createBrowserRouter } from 'react-router-dom';
import './index.css'
import HomePage from './routes/homepage/HomePage';
import DashboardPage from './routes/dashboardpage/DashboardPage';
import ChatPage from './routes/chatpage/ChatPage';
import RootLayout from './layouts/rootLayout/RootLayout';
import DashboardLayout from './layouts/dashboardLayout/DashboardLayout';
import SigninPage from './routes/signinpage/SigninPage';
import SignupPage from './routes/signuppage/SignupPage';




const router = createBrowserRouter([
  {
    element: <RootLayout/>,
    children: [
      {
        path: "/",
        element: <HomePage/>
      },
      {
        path: "/sign-in/*",
        element: <SigninPage/>,
      },
      {
        path: "/sign-up/*",
        element: <SignupPage/>,
      },
      {
        element:<DashboardLayout/>,
        children: [
          {
            path: "/dashboard",
            element:<DashboardPage/>,
          },
          {
            path: "/dashboard/chats/:id",
            element:<ChatPage/>
          },
        ],

      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 <RouterProvider router={router} />
  </React.StrictMode>,
)

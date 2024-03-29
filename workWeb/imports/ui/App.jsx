import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TimeOffsPage from './pages/time-offs';
import TimeOffsRequestsPage from './pages/time-offs-requests';
import SignInPage from "/imports/ui/pages/sign-in";
import SignUpPage from '/imports/ui/pages/sign-up';

const router = createBrowserRouter([
  {
    path:'/',
    element:  <TimeOffsPage />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/requests",
    element: <TimeOffsRequestsPage />,
  }
])


export const App = () => {
  return (
    <RouterProvider router = {router} />
  )
}
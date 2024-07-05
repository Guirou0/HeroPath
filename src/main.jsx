import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import Auth from '../routes/Auth.jsx'
import Home from '../routes/Home.jsx'
import Discover from '../routes/Discover.jsx'
import Search from '../routes/Search.jsx'
import Compare from '../routes/Compare.jsx'
import Hero from '../routes/Hero.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AuthProvider } from '../contexts/AuthContext.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Auth />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/discover",
        element: <Discover />,
      },
      {
        path: "/search/:name",
        element: <Search />,
      },
      {
        path: "/compare",
        element: <Compare />,
      },
      {
        path: "/hero/:id",
        element: <Hero />
      },
    ],
  },
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)

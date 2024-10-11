import React from 'react'
import TopBar from './components/TopBar'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import AppRoutes from './components/utils/AppRoutes.jsx'

function App() {
  let router = createBrowserRouter(AppRoutes)
  return <>
  <RouterProvider router={router}/>
  </>
}

export default App

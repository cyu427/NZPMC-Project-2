import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import LandingPage from './pages/LandingPage/LandingPage'

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

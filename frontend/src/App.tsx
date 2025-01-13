import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LandingPage from './pages/LandingPage/LandingPage';

function App() {
    const [queryClient] = useState(() => new QueryClient());

    const router = createBrowserRouter([
        { path: "/", element: <LandingPage /> },
    ])

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
      )
}

export default App;
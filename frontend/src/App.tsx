import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LandingPage from './pages/LandingPage/LandingPage';
import AuthProvider from './states/auth/AuthProvider';
import LandingPageSignedIn from './pages/LandingPageSignedIn/LandingPageSignin';
import JoinEventRerenderProvider from './states/joinEvent/JoinEventRerenderProvider';

function App() {
    const [queryClient] = useState(() => new QueryClient());

    const router = createBrowserRouter([
        { path: "/", element: <LandingPage /> },
        { path: "/signed-in", element: <JoinEventRerenderProvider> <LandingPageSignedIn /> </JoinEventRerenderProvider>},
    ])

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </QueryClientProvider>
      )
}

export default App;
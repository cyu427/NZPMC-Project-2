import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LandingPage from './pages/LandingPage/LandingPage';
import AuthProvider from './states/auth/AuthProvider';
import LandingPageSignedIn from './pages/LandingPageSignedIn/LandingPageSignin';
import JoinEventRerenderProvider from './states/joinEvent/JoinEventRerenderProvider';
import AdminLayout from './pages/Admin/AdminLayout';
import AdminEventPage from './pages/Admin/ChildPages/AdminEventsPage';
import AdminQuestionPage from './pages/Admin/ChildPages/AdminQuestionPage';
import AdminCompetitionPage from './pages/Admin/ChildPages/AdminCompetitionPage';

function App() {
    const [queryClient] = useState(() => new QueryClient());

    const router = createBrowserRouter([
        { path: "/", element: <LandingPage /> },
        { path: "/signed-in", element: <JoinEventRerenderProvider> <LandingPageSignedIn /> </JoinEventRerenderProvider>},
        { 
            path: "/admin", 
            element: <AdminLayout /> ,
            children: [
                { index: true, element: <div>Welcome to Admin Panel</div> },
                { path: "event", element: <AdminEventPage /> },
                { path: "question", element: <AdminQuestionPage /> },
                { path: "competition", element: <AdminCompetitionPage /> }
            ],
        }
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
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import PrivateRoute from "./auth/components/PrivateRoute";

import { AuthLayout } from "./auth/layout/AuthLayout";
import { LoginPage } from "./auth/pages/LoginPage";
import { RegisterPage } from "./auth/pages/RegisterPage";

import { sleep } from "./lib/sleep";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "./fake-data";

import Loading from "./components/ui/loading";

// Lazy Load
const ChatLayout = lazy(async () => {
    await sleep(1500);
    return import("./chat/layout/ChatLayout");
});

const ChatPage = lazy(async () => import("./chat/pages/ChatPages"));
const NoChatSelectedPage = lazy(async () => import("./chat/pages/NoChatSelectedPage"));

export const AppRouter = () => {

    const { data: user, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: () => {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            return checkAuth(token);
        },
        retry: 0,
    });

    if (isLoading) {
        return <Loading />;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<AuthLayout />}>
                    <Route index element={<LoginPage />} />
                    <Route path="/auth/register" element={<RegisterPage />} />
                    {/* <Route path="/auth" element={<Navigate to="/auth/login" />} /> */}
                </Route>

                {/* Chat */}
                <Route path="/chat" element={
                    <Suspense fallback={
                        <div className="flex justify-center items-center h-screen">
                            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                        </div>
                    }>
                        <PrivateRoute isAuthenticated={!!user}>
                            <ChatLayout />
                        </PrivateRoute>
                    </Suspense>
                }>
                    <Route index element={
                        <PrivateRoute isAuthenticated={!!user}>
                            <NoChatSelectedPage />
                        </PrivateRoute>
                    } />
                    <Route path="/chat/:clientId" element={
                        <PrivateRoute isAuthenticated={!!user}>
                            <ChatPage />
                        </PrivateRoute>
                    } />
                </Route>

                <Route path="/" element={<Navigate to="/auth" />} />
                <Route path="*" element={<Navigate to="/auth" />} />
            </Routes>
        </BrowserRouter>
    );
}
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import AuthLayout from "./auth/layout/AuthLayout";
import { RegisterPage } from "./auth/pages/RegisterPage";
import { LoginPage } from "./auth/pages/LoginPage";
import { sleep } from "./lib/sleep";

// Lazy Load
const ChatLayout = lazy(async () => {
    await sleep(1500); 
    return import("./chat/layout/ChatLayout");
});

const ChatPage = lazy(async () => import("./chat/pages/ChatPages"));

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<AuthLayout />}>
                    <Route index element={<LoginPage />}/>
                    <Route path="/auth/register" element={<RegisterPage />}/>
                    {/* <Route path="/auth" element={<Navigate to="/auth/login" />} /> */}
                </Route>

                {/* Chat */}
                <Route path="/chat" element={
                    <Suspense fallback={
                        <div className="flex justify-center items-center h-screen">
                            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                        </div>
                    }>
                        <ChatLayout />
                    </Suspense>
                }>
                </Route>
                
                <Route path="*" element={<Navigate to="/auth" />} />
            </Routes>
        </BrowserRouter>
    );
}
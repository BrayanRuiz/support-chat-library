import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import AuthLayout from "./auth/layout/AuthLayout";
import { RegisterPage } from "./auth/pages/RegisterPage";
import { LoginPage } from "./auth/pages/LoginPage";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<AuthLayout />}>
                    <Route index element={<LoginPage />}/>
                    <Route path="/auth/register" element={<RegisterPage />}/>
                    {/* <Route path="/auth" element={<Navigate to="/auth/login" />} /> */}
                </Route>
                
                <Route path="*" element={<Navigate to="/auth" />} />
            </Routes>
        </BrowserRouter>
    );
}
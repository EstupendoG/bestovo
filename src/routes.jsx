import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Portfolio from "./pages/Portfolio/Portfolio";

const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Homepage/>} path="/" />
                <Route element={<Portfolio/>} path="/portfolio" />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
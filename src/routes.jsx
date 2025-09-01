import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Portfolio from "./pages/Portfolio/Portfolio";

const AppRoutes = () => {
    return(
        <Router>
            <Routes>
                <Route element={<Homepage/>} path="" />
                <Route element={<Portfolio/>} path="/portfolio" />
            </Routes>
        </Router>
    )
}

export default AppRoutes
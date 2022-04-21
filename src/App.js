//import react router dom
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import dashboard and TicketPage
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { TicketPage } from "./pages/TicketPage";
import CategoriesContext from "./context";
import { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";

import { Nav } from "./components/Nav";

const App = () => {
    const [categories, setCategories] = useState(null);
    const value = { categories, setCategories };
    const [cookies, setCookie, removeCookie] = useCookies([
        "user_ticket",
        "token_ticket",
    ]);

    const authToken = cookies.token_ticket;

    console.log(cookies.user_ticket?.avatar);

    return (
        <div className="app">
            <CategoriesContext.Provider value={value}>
                <Router>
                    {!authToken ? (
                        <Routes>
                            <Route
                                path="/"
                                element={<Home/>}
                            />
                            <Route
                                path="*"
                                element={<Home/>}
                            />
                        </Routes>
                    ) : (
                        <>
                            <Nav />
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route
                                    path="/ticket"
                                    element={<TicketPage />}
                                />
                                <Route
                                    path="/ticket/:id"
                                    element={<TicketPage editMode={true} />}
                                />
                                <Route path="*" element={<Dashboard />} />
                            </Routes>
                        </>
                    )}
                </Router>
            </CategoriesContext.Provider>
        </div>
    );
};

export default App;

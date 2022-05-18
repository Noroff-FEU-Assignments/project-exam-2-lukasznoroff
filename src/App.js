import GlobalStyle from "./styles/GlobalStyle";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Hotel from "./pages/Hotel";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import {AuthProvider} from "./context/AuthContext";
import Navbar from "./components/Navbar";


function App() {
    return (
        <AuthProvider>
            <div className="App">
                <GlobalStyle/>
                <BrowserRouter>
                    <Navbar/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/hotels" element={<Hotels/>}/>
                            <Route path="/hotel/:id" element={<Hotel/>}/>
                            <Route path="/contact" element={<Contact/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/admin" element={<Admin/>}/>
                        </Routes>
                </BrowserRouter>
            </div>
        </AuthProvider>
    );
}

export default App;

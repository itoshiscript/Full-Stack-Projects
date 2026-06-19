import './App.css'
import {Routes, Route} from "react-router-dom";
import {Home} from "./pages/Home";
import {Navbar} from "./components/Navbar.tsx";
import {Login} from "./auth/Login.tsx";
import {Register} from "./auth/Register.tsx";

function App() {

    return (
        <>
            <Navbar/>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/auth/login"} element={<Login/>}/>
                <Route path={"/auth/register"} element={<Register/>}/>
            </Routes>
        </>
    )
}

export default App

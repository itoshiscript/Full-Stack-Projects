import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Generate from "./pages/Generate";
import Maintenance from "./pages/Maintenance";

function App() {
    const [isUnderMaintenance] = useState(false); // Set to true to show maintenance page

    return (
        <>
            {isUnderMaintenance ? <Maintenance /> : <Generate />}
            <Analytics />
        </>
    );
}

export default App;

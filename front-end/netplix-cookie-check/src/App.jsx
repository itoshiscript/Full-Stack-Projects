import { useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Generate from "./pages/Generate";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Generate />
            <Analytics />
        </>
    );
}

export default App;

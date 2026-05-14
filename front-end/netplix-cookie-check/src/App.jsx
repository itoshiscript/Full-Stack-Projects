import { Analytics } from "@vercel/analytics/react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Generate from "./pages/Generate";

function App() {
    return (
        <>
            <Generate />
            <Analytics />
        </>
    );
}

export default App;

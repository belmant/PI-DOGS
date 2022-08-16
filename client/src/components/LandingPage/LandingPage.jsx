import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";
import videoLanding from "./videoLanding.mp4";

export default function LandingPage() {
return (
    <div>
    <video loop autoPlay muted playsInline>
        <source src={videoLanding} type="video/mp4" />
    </video>
    <div className="titleLanding">
        <h1>Bienvenidos</h1>
    </div>
    <div className="buttonLanding">
        <Link to="/home">
        <button class="button-landing">Get Into</button>
        </Link>
    </div>
    </div>
);
}

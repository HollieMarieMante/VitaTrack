import { Link } from "react-router-dom";
import "./styles/Landing.css"

const Landing = () => {
    
    return (
        <>
        
        <div className="navbar">
                <div className="navbar-logo">
                    <img height="auto" width={45} src="/logo.png" alt="checklist" />
                    <p>itaTrack</p>
                </div>

                <div className="navbar-button">
                    <Link to="/signup">
                        <button>
                            Sign up now!
                        </button>
                    </Link>
                </div>
            </div>

        <div className="landing-body">
            <div className="landing-middle">
                <div>
                    <h1>Track every moment.</h1>
                    <h2>Empower every choice.</h2>
                    <p>Take control of your life and manage every important moment with ease.</p>

                    <div>
                        <Link to="/signup">
                            <button>
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>

                <div>
                    <img className="checklist-img" src="/landing.png" alt="checklist" />
                </div>
            </div>

        </div>
        
        </>
    )
}

export default Landing;
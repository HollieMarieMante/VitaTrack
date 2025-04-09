import { Link } from "react-router-dom";

const Landing = () => {
    
    return (
        <>
            <h1>Track every moment.</h1>
            <h2>Empower every choice.</h2>
            <p>Take control of your life and manage every important moment with ease.</p>

            <div>
                <Link to="/login">
                    <button>Login</button>
                </Link>
                <Link to="/signup">
                    <button>Get Started</button>
                </Link>
            </div>
        </>
    )
}

export default Landing;
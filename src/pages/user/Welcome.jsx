import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Welcome = () => {
    const { user, loading } = useAuth();

    function getFirstName(str) {
        const words = str.trim().split(" ");
        return words[0];
    }

    if(loading) {
        return <p>Loading...</p>
    }

    if (!user) {
        return <div>Please log in to access this page.</div>;
    }

    const getFallbackName = () => {
        if (!user) return "User";
        if (user.displayName) return getFirstName(user.displayName);
        if (user.email && !user.displayName) return user.email.split("@")[0];
        return "User";
    };
      
      const nickname = getFallbackName();

    return (
        <>
            <h1>Welcome {nickname || "User"}!</h1>
            <h4>WELCOME BACK! STAY ON TOP OF YOUR EXPENSES, 
            MOODS, EVENTS, AND TASKS—ALL IN ONE PLACE. LET'S 
            MAKE TODAY PRODUCTIVE AND BALANCED. YOU'VE 
            GOT THIS! 👍 ✨</h4>

            <div>
                <Link to="/expenses">
                    <button>Expenses tracker</button>
                </Link>

                <Link to="/mood">
                    <button>Mood tracker</button>
                </Link>

                <Link to="/tasks">
                    <button>Tasks tracker</button>
                </Link>
            </div>
        </>
    )
}

export default Welcome;
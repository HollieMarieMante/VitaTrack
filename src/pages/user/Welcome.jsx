import { Link } from "react-router-dom";

const Welcome = () => {
    return (
        <>
            <h1>Welcome User!</h1>
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
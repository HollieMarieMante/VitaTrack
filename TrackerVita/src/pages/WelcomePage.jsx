import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/WelcomePage.css'; 

const WelcomePage = ({ user }) => {
  const [username, setUsername] = useState('USERNAME');
  
  useEffect(() => {
    // If you have user data, you can set the actual username here
    if (user && user.displayName) {
      setUsername(user.displayName);
    }
  }, [user]);

  return (
    <div className="welcome-container">
      {/* Navigation tabs */}
      <div className="tabs-container">
        <Link to="/expense-tracker" className="tab">EXPENSE</Link>
        <Link to="/mood" className="tab">MOOD</Link>
        <div className="username-tab">username</div>
        <Link to="/task" className="tab">TASK</Link>
        <Link to="/event" className="tab">EVENT</Link>
      </div>
      
      {/* Welcome message section */}
      <div className="welcome-content">
        <h1 className="welcome-title">HI, {username}!</h1>
        <p className="welcome-message">
          WELCOME BACK! STAY ON TOP OF YOUR EXPENSES, 
          MOODS, EVENTS, AND TASKS—ALL IN ONE PLACE. LET'S 
          MAKE TODAY PRODUCTIVE AND BALANCED. YOU'VE 
          GOT THIS! 👍 ✨
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
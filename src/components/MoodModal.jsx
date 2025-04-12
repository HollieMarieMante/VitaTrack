import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import "../pages/styles/MoodStatsModal.css";

const MoodModal = ({ isOpen, onClose, moodData, moodColors }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Mood Statistics</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-content">
          <div className="mood-right-side">
            <h2>Mood Stats</h2>
            {moodData.length > 0 ? (
              <PieChart width={400} height={300}>
                <Pie
                  data={moodData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {moodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={moodColors[entry.name]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            ) : (
              <p>No mood data yet.</p>
            )}
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="action-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default MoodModal;
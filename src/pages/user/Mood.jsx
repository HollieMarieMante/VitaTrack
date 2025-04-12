import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useAddMood } from "../../hooks/useAddMood";
import { useGetMoods } from "../../hooks/useGetMoods";
import MoodModal from "../../components/MoodModal";
import "../styles/Moods.css"

const moodColors = {
  Happy: "#FFD700",
  "In love": "#FF69B4",
  Relaxed: "#87CEFA",
  Pleased: "#98FB98",
  Neutral: "#D3D3D3",
  Sad: "#1E90FF",
  Confused: "#FF8C00",
  Angry: "#FF4500",
};

const Mood = () => {
  const { addMood } = useAddMood();
  const { moods } = useGetMoods();

  const [date, setDate] = useState(new Date());
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dateKey = date.toISOString().split("T")[0];
  const todayKey = new Date().toISOString().split("T")[0];
  const savedMood = moods?.[dateKey];

  const isToday = dateKey === todayKey;
  const isFuture = date > new Date();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSave = async () => {
    if (!selectedMood || !note) return;
    await addMood(dateKey, { mood: selectedMood, note });
    setSelectedMood("");
    setNote("");
  };

  const moodCounts = Object.values(moods).reduce((acc, moodEntry) => {
    const mood = moodEntry.mood;
    acc[mood] = (acc[mood] || 0) + 1;
    return acc;
  }, {});

  const moodData = Object.keys(moodCounts).map((mood) => ({
    name: mood,
    value: moodCounts[mood],
  }));

  useEffect(() => {
    if (savedMood) {
      setSelectedMood(savedMood.mood);
      setNote(savedMood.note);
    } else {
      setSelectedMood("");
      setNote("");
    }
  }, [dateKey, moods]);

  return (
    <div className="mood-page">
      <div className="mood-left-side">
        <h2>Mood Calendar</h2>
        <Calendar
          onChange={setDate}
          value={date}
          tileDisabled={({ date }) => date > new Date()}
        />
      </div>

      <div className="add-mood">
        <h2>{isToday ? "Today's Mood Entry" : `Entry for ${dateKey}`}</h2>
            {savedMood ? (
              <>
                <p><strong>Mood:</strong> {savedMood.mood}</p>
                <p><strong>Note:</strong> {savedMood.note}</p>
              </>
            ) : (
              !isFuture && (
                <>
                  <label>Mood:</label>
                  <select
                    value={selectedMood}
                    onChange={(e) => setSelectedMood(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Happy">😊 Happy</option>
                    <option value="In love">😍 In Love</option>
                    <option value="Relaxed">😌 Relaxed</option>
                    <option value="Pleased">😁 Pleased</option>
                    <option value="Neutral">😐 Neutral</option>
                    <option value="Sad">😢 Sad</option>
                    <option value="Confused">😕 Confused</option>
                    <option value="Angry">😠 Angry</option>
                  </select>

                  <label>Note:</label>
                  <textarea
                    rows={4}
                    cols={30}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    required
                  />

                  <button onClick={handleSave}>Save Mood</button>
                </>
              )
            )}

            <button onClick={openModal} className="view-stats-button">
                View Mood Statistics
              </button>

              <MoodModal 
                isOpen={isModalOpen}
                onClose={closeModal}
                moodData={moodData}
                moodColors={moodColors}
              />
          </div>
    </div>
  );
};

export default Mood;

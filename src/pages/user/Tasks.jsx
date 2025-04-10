import React, { useState } from "react";
import { useAddTask } from "../../hooks/useAddTask";
import { useGetTasks } from "../../hooks/useGetTasks";
import { useUpdateTask } from "../../hooks/useUpdateTask";
import { useDeleteTask } from "../../hooks/useDeleteTask";
import "../styles/Tasks.css";

const Tasks = () => {
  const { tasks } = useGetTasks();
  const { addTask } = useAddTask();
  const { updateTask } = useUpdateTask();
  const { deleteTask } = useDeleteTask();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({
      title,
      description,
      deadline,
      priority,
    });
    setTitle("");
    setDescription("");
    setDeadline("");
    setPriority("Low");
  };

  const handleCompleteTask = (taskId, completed) => {
    updateTask(taskId, { completed: !completed });
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  return (
    <div className="tasks-tracker">
      <div className="tasks-body">
          <form onSubmit={handleSubmit}>
            <h2>Your Tasks</h2>
            <h3>Add task</h3>
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <button type="submit">Add Task</button>
          </form>

          <ul className="task-list">
            {tasks.length === 0 ? (
              <li style={{ opacity: 0.6, fontStyle: "italic", padding: "1rem" }}>
                No tasks at the moment.
              </li>
            ) : (
              tasks.map((task) => (
                <li
                  key={task.id}
                  className={`task-tile ${task.completed ? "completed" : ""}`}
                >
                  <div className="task-header">
                    <h4>{task.title}</h4>
                    <label>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleCompleteTask(task.id, task.completed)}
                      />
                      Completed
                    </label>
                  </div>
                  <p className="description">{task.description}</p>
                  <p><strong>Deadline:</strong> {task.deadline}</p>
                  <p>
                    <strong>Priority:</strong>{" "}
                    <span className={`priority ${task.priority}`}>{task.priority}</span>
                  </p>
                  <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </li>
              ))
            )}
          </ul>
      </div>
    </div>
  );
};

export default Tasks;

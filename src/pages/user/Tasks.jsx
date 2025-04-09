import React, { useState } from "react";
import { useAddTask } from "../../hooks/useAddTask";
import { useGetTasks } from "../../hooks/useGetTasks";
import { useUpdateTask } from "../../hooks/useUpdateTask";
import { useDeleteTask } from "../../hooks/useDeleteTask";

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
      <h2>Task Tracker</h2>

      <form onSubmit={handleSubmit}>
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

      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>Deadline: {task.deadline}</p>
            <p>Priority: {task.priority}</p>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCompleteTask(task.id, task.completed)}
              />
              Completed
            </label>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;

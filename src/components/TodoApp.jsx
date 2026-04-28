import { useEffect, useState } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "../services/api";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Load tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  // Add task
  const handleAdd = async () => {
    if (!input.trim()) return;

    try {
      await addTask({ title: input, completed: false });
      setInput("");
      fetchTasks();
    } catch (err) {
      console.error("Error adding task", err);
    }
  };

  // Toggle complete
  const toggleComplete = async (task) => {
    try {
      await updateTask(task.id, {
        ...task,
        completed: !task.completed,
      });
      fetchTasks();
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  return (
    <section id="todo" className="py-20 px-20 py-20">
      <h2 className="text-4xl font-bold text-green-400 mb-6">To-Do App</h2>

      {/* Input */}
      <div className="flex gap-4 mb-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task..."
          className="flex-1 p-3 bg-gray-800 text-white outline-none"
        />

        <button
          onClick={handleAdd}
          className="px-6 bg-green-400 text-black font-semibold"
        >
          Add
        </button>
      </div>

      {/* Task list */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex justify-between items-center bg-gray-900 p-4"
          >
            <span
              onClick={() => toggleComplete(task)}
              className={`cursor-pointer ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {task.title}
            </span>

            <button
              onClick={() => handleDelete(task.id)}
              className="text-red-400"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TodoApp;

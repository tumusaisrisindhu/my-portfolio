import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // change after deployment
});

// GET all tasks
export const getTasks = () => API.get("/tasks");

// ADD task
export const addTask = (task) => API.post("/tasks", task);

// UPDATE task
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);

// DELETE task
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

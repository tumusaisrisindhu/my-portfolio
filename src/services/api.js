import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // change after deployment
});

// todo list APIs start, used axios
// GET all tasks
export const getTasks = () => API.get("/tasks");

// ADD task
export const addTask = (task) => API.post("/tasks", task);

// UPDATE task
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);

// DELETE task
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
// todo list APIs end

// calculator APIs start, used async-await
//Simple Interest API
export const calculateSimpleInterest = async (data) => {
  const response = await API.post("/calculate/simple-interest", data);

  return response.data;
};

// Comppund Interest API
export const calculateCompoundInterest = async (data) => {
  const response = await API.post("/calculate/compound-interest", data);

  return response.data;
};

// EMI API
export const calculateEMI = async (data) => {
  const response = await API.post("/calculate/emi", data);

  return response.data;
};

// Discount API
export const calculateDiscount = async (data) => {
  const response = await API.post("/calculate/discount", data);

  return response.data;
};
//calculator APIs end

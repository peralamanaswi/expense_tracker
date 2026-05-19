import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

export const getExpenses = () => api.get("/expenses");
export const getAnalytics = () => api.get("/expenses/analytics");
export const createExpense = (payload) => api.post("/expenses", payload);
export const updateExpense = (id, payload) => api.put(`/expenses/${id}`, payload);
export const deleteExpense = (id) => api.delete(`/expenses/${id}`);
export const uploadInvoice = (formData) =>
  api.post("/expenses/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

export default api;

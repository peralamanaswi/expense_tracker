import { useEffect, useMemo, useState } from "react";
import { RefreshCcw } from "lucide-react";
import Dashboard from "./components/Dashboard";
import ExpenseForm, { emptyForm } from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import UploadPanel from "./components/UploadPanel";
import { createExpense, deleteExpense, getAnalytics, getExpenses, updateExpense, uploadInvoice } from "./api/expenseApi";

const getErrorMessage = (error) => error.response?.data?.message || error.message || "Something went wrong";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editingExpense, setEditingExpense] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const refreshData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const [expensesResponse, analyticsResponse] = await Promise.all([getExpenses(), getAnalytics()]);
      setExpenses(expensesResponse.data);
      setAnalytics(analyticsResponse.data);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const totalsByCategory = useMemo(() => analytics?.categoryStats || [], [analytics]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");

    try {
      if (editingExpense) {
        await updateExpense(editingExpense._id, form);
        setNotice("Expense updated successfully.");
      } else {
        await createExpense(form);
        setNotice("Expense added successfully.");
      }

      setForm(emptyForm);
      setEditingExpense(null);
      await refreshData();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setNotice("");
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("invoice", file);
      const response = await uploadInvoice(formData);
      const extractedData = response.data.data;

      setForm({
        shopName: extractedData.shopName || "",
        amount: extractedData.amount || "",
        date: extractedData.date || new Date().toISOString().slice(0, 10),
        category: extractedData.category || "Others",
        notes: extractedData.notes || ""
      });
      
      setNotice("Invoice extracted successfully. Please review and click 'Add' to save.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setForm({
      shopName: expense.shopName,
      amount: expense.amount,
      date: expense.date,
      category: expense.category,
      notes: expense.notes || ""
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this expense?");
    if (!confirmed) return;

    try {
      await deleteExpense(id);
      setNotice("Expense removed successfully.");
      await refreshData();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  };

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">OCR + Gemini Expense Intelligence</p>
          <h1>AI Expense Tracker</h1>
        </div>
        <button className="ghost-button" type="button" onClick={refreshData} title="Refresh dashboard">
          <RefreshCcw size={18} />
          Refresh
        </button>
      </header>

      {(notice || error) && (
        <div className={error ? "alert error" : "alert success"}>
          {error || notice}
        </div>
      )}

      <div className="top-layout">
        <UploadPanel onUpload={handleUpload} isUploading={isUploading} />
        <section className="manual-panel">
          <h2>{editingExpense ? "Edit Expense" : "Manual Expense"}</h2>
          <ExpenseForm
            form={form}
            setForm={setForm}
            editingExpense={editingExpense}
            onSubmit={handleSubmit}
            onCancel={() => {
              setEditingExpense(null);
              setForm(emptyForm);
            }}
          />
        </section>
      </div>

      {isLoading ? <p className="empty-state">Loading dashboard...</p> : <Dashboard analytics={{ ...analytics, categoryStats: totalsByCategory }} />}
      <ExpenseTable expenses={expenses} onEdit={handleEdit} onDelete={handleDelete} />
    </main>
  );
};

export default App;

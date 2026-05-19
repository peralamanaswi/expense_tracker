import { Save, X } from "lucide-react";
import { toDateInputValue } from "../utils/formatters";

const categories = ["Food", "Travel", "Shopping", "Utilities", "Healthcare", "Entertainment", "Education", "Office", "Others"];

const emptyForm = {
  shopName: "",
  amount: "",
  date: new Date().toISOString().slice(0, 10),
  category: "Others",
  notes: ""
};

const ExpenseForm = ({ form, setForm, editingExpense, onSubmit, onCancel }) => {
  const value = editingExpense
    ? { ...form, date: toDateInputValue(form.date) }
    : form || emptyForm;

  const updateField = (field, fieldValue) => {
    setForm((current) => ({ ...current, [field]: fieldValue }));
  };

  return (
    <form className="expense-form" onSubmit={onSubmit}>
      <div className="form-row">
        <label>
          Shop
          <input value={value.shopName} onChange={(event) => updateField("shopName", event.target.value)} placeholder="KFC, Big Bazaar, Uber" required />
        </label>
        <label>
          Amount
          <input type="number" min="0" step="0.01" value={value.amount} onChange={(event) => updateField("amount", event.target.value)} required />
        </label>
      </div>
      <div className="form-row">
        <label>
          Date
          <input type="date" value={value.date} onChange={(event) => updateField("date", event.target.value)} required />
        </label>
        <label>
          Category
          <select value={value.category} onChange={(event) => updateField("category", event.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Notes
        <textarea value={value.notes || ""} onChange={(event) => updateField("notes", event.target.value)} rows="3" placeholder="Optional context" />
      </label>
      <div className="button-row">
        <button className="primary-button" type="submit" title="Save expense">
          <Save size={18} />
          {editingExpense ? "Update" : "Add"}
        </button>
        {editingExpense && (
          <button className="ghost-button" type="button" onClick={onCancel} title="Cancel editing">
            <X size={18} />
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export { emptyForm };
export default ExpenseForm;

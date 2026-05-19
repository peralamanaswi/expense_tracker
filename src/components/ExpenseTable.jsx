import { Edit3, Trash2 } from "lucide-react";
import { formatCurrency, formatDate } from "../utils/formatters";

const ExpenseTable = ({ expenses, onEdit, onDelete }) => (
  <section className="table-panel">
    <h2>All Expenses</h2>
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Bill</th>
            <th>Shop</th>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>
                {expense.imageUrl ? <img className="thumb" src={expense.imageUrl} alt={`${expense.shopName} invoice`} /> : <span className="mini-placeholder">Manual</span>}
              </td>
              <td>
                <strong>{expense.shopName}</strong>
                {expense.aiSummary && <small>{expense.aiSummary}</small>}
              </td>
              <td>{formatDate(expense.date)}</td>
              <td><span className="pill">{expense.category}</span></td>
              <td>{formatCurrency(expense.amount)}</td>
              <td>
                <div className="icon-actions">
                  <button type="button" onClick={() => onEdit(expense)} title="Edit expense" aria-label="Edit expense">
                    <Edit3 size={17} />
                  </button>
                  <button type="button" onClick={() => onDelete(expense._id)} title="Delete expense" aria-label="Delete expense">
                    <Trash2 size={17} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {expenses.length === 0 && <p className="empty-state">No expenses saved yet.</p>}
    </div>
  </section>
);

export default ExpenseTable;

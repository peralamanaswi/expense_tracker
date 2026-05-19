import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Brain, ReceiptText, TrendingUp, WalletCards } from "lucide-react";
import { formatCurrency, formatDate } from "../utils/formatters";

const colors = ["#2563eb", "#059669", "#d97706", "#dc2626", "#7c3aed", "#0891b2", "#be123c", "#4b5563"];

const Dashboard = ({ analytics }) => {
  const empty = !analytics || analytics.count === 0;

  return (
    <section className="dashboard-grid">
      <article className="metric-panel">
        <WalletCards size={22} />
        <span>Total Expenses</span>
        <strong>{formatCurrency(analytics?.totalExpenses || 0)}</strong>
      </article>
      <article className="metric-panel">
        <ReceiptText size={22} />
        <span>Saved Bills</span>
        <strong>{analytics?.count || 0}</strong>
      </article>
      <article className="metric-panel wide">
        <Brain size={22} />
        <span>AI Spending Insights</span>
        <ul>
          {(analytics?.insights || ["Upload a bill or add an expense to see insights."]).map((insight) => (
            <li key={insight}>{insight}</li>
          ))}
        </ul>
      </article>

      <article className="chart-panel">
        <div className="panel-title">
          <TrendingUp size={20} />
          <h2>Monthly Expenses</h2>
        </div>
        {empty ? (
          <p className="empty-state">No monthly data yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={analytics.monthlyExpenses}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]} fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </article>

      <article className="chart-panel">
        <div className="panel-title">
          <ReceiptText size={20} />
          <h2>Category Split</h2>
        </div>
        {empty ? (
          <p className="empty-state">Categories appear after expenses are saved.</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={analytics.categoryStats} dataKey="amount" nameKey="category" outerRadius={90} label>
                {analytics.categoryStats.map((entry, index) => (
                  <Cell key={entry.category} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </article>

      <article className="chart-panel full">
        <div className="panel-title">
          <TrendingUp size={20} />
          <h2>Expense Trends</h2>
        </div>
        {empty ? (
          <p className="empty-state">Trend line will update dynamically as you add bills.</p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={analytics.expenseTrends}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Line type="monotone" dataKey="amount" stroke="#059669" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </article>

      <article className="recent-panel full">
        <h2>Recent Bills</h2>
        <div className="recent-list">
          {(analytics?.recentBills || []).map((bill) => (
            <div className="recent-item" key={bill._id}>
              {bill.imageUrl ? <img src={bill.imageUrl} alt={`${bill.shopName} bill`} /> : <div className="image-placeholder">No image</div>}
              <div>
                <strong>{bill.shopName}</strong>
                <span>{bill.category} · {formatDate(bill.date)}</span>
              </div>
              <b>{formatCurrency(bill.amount)}</b>
            </div>
          ))}
          {!analytics?.recentBills?.length && <p className="empty-state">Recent uploaded bills will show here.</p>}
        </div>
      </article>
    </section>
  );
};

export default Dashboard;

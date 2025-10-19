import { useEffect, useState } from "react";
import {
  getBooksLoans,
  getUsersLoans,
  getLoanDefeated,
  getTopBooks
} from "../services/api.js";

import {
  BarChart, Bar,
  PieChart, Pie,
  Cell,
  XAxis, YAxis, Tooltip,
  Legend, ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const [booksLoans, setBooksLoans] = useState([]);
  const [usersLoans, setUsersLoans] = useState([]);
  const [loanDefeated, setLoanDefeated] = useState([]);
  const [topBooks, setTopBooks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [ books, users, defeated, top ] = await Promise.all([
        getBooksLoans(),
        getUsersLoans(),
        getLoanDefeated(),
        getTopBooks()
      ]);
      setBooksLoans(books);
      setUsersLoans(users);
      setLoanDefeated(defeated);
      setTopBooks(top);
    } catch (err) {
      console.error("Error cargando estadísticas:", err);
      setError("No se pudieron cargar los datos.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Cargando dashboard…</p>;
  if (error) return <p className="text-danger">{error}</p>;

  const dataTopBooks = topBooks.map(item => ({
    title: item.book?.title || "Sin título",
    count: item.loan_count
  }));

 // 2. Datos para estado de préstamos (prestados vs devueltos)
const prestados = booksLoans.filter(loan => loan.status === 0).length;
const devueltos = booksLoans.filter(loan => loan.status === 1).length;

const dataLoanStatus = [
  { name: "Prestados", value: prestados },
  { name: "Devueltos", value: devueltos }
];


  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div>
      <h1>Dashboard</h1>

      <div style={{ width: "100%", height: 300, marginBottom: 40 }}>
        <h3>Top 5 Libros más prestados</h3>
        <ResponsiveContainer>
          <BarChart data={dataTopBooks}>
            <XAxis dataKey="title" tick={{ angle: 0, textAnchor: "end" }} height={60} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: "100%", height: 300, marginBottom: 40 }}>
        <h3>Estado de los préstamos</h3>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={dataLoanStatus}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {dataLoanStatus.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginBottom: 40 }}>
        <h3>Préstamos vencidos</h3>
        <ul>
          {loanDefeated.map(loan => (
            <li key={loan.id}>
              {loan.book?.title} — {loan.user?.name} — devolución: {loan.return_date}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Usuarios con préstamos activos</h3>
        <ul>
          {[...new Set(usersLoans.map(l => l.user?.name))].map((u, i) => (
            <li key={i}>{u}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

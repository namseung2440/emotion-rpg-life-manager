import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import New from "./pages/New";
import Calendar from "./pages/Calendar";
import DiaryPage from "./pages/DiaryPage";
import Edit from "./pages/Edit";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [todos, setTodos] = useState([]);
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(prev => !prev);

  const gainXP = (amount) => {
    const newXP = xp + amount;
    if (newXP >= 100) {
      setLevel(level + 1);
      setXp(newXP - 100);
    } else {
      setXp(newXP);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home data={data} setData={setData} level={level} xp={xp} todos={todos} setTodos={setTodos} gainXP={gainXP} isDark={isDark} toggleTheme={toggleTheme} />} />
        <Route path="/calendar" element={<Calendar data={data} isDark={isDark} toggleTheme={toggleTheme} />} />
        <Route path="/new" element={<New data={data} setData={setData} gainXP={gainXP} isDark={isDark} toggleTheme={toggleTheme} />} />
        <Route path="/diary/:date" element={<DiaryPage data={data} isDark={isDark} toggleTheme={toggleTheme} />} />
        <Route path="/edit/:id" element={<Edit data={data} setData={setData} isDark={isDark} toggleTheme={toggleTheme} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
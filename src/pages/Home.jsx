import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EmotionGraph from "../components/EmotionGraph";

function Home({ data, setData, level, xp, todos, setTodos, gainXP, isDark, toggleTheme }) {
  const [todoText, setTodoText] = useState("");

  const theme = {
    bg: isDark ? "#0f0f1a" : "#f5f5ff",
    card: isDark ? "#1a1a2e" : "#ffffff",
    border: isDark ? "#2d2d4a" : "#e5e7eb",
    text: isDark ? "#ffffff" : "#1a1a2e",
    subText: isDark ? "#6b7280" : "#9ca3af",
    moodBg: isDark ? "linear-gradient(135deg,#1a1a2e,#2d1f4a)" : "linear-gradient(135deg,#ede9fe,#dbeafe)",
    moodBorder: isDark ? "#4c3a7a" : "#c4b5fd",
    accentText: isDark ? "#a78bfa" : "#7c3aed",
    tagBg: isDark ? "#2d1f4a" : "#ede9fe",
    xpBg: isDark ? "#2d2d4a" : "#e5e7eb",
    badgeBg: isDark ? "#2d2d4a" : "#ede9fe",
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get("http://localhost:4000/todos");
        setTodos(res.data.map(t => ({ id: t.id, text: t.content, done: t.done === 1 })));
      } catch (err) { console.error(err); }
    };
    fetchTodos();
  }, []);

  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        const res = await axios.get("http://localhost:4000/emotions");
        setData(res.data);
      } catch (err) { console.error(err); }
    };
    fetchEmotions();
  }, []);

  const completed = todos.filter(t => t.done).length;
  const total = todos.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  const addTodo = async () => {
    if (!todoText) return;
    try {
      await axios.post("http://localhost:4000/todos", { content: todoText });
      const res = await axios.get("http://localhost:4000/todos");
      setTodos(res.data.map(t => ({ id: t.id, text: t.content, done: t.done === 1 })));
      setTodoText("");
    } catch (err) { console.error(err); }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find(t => t.id === id);
      await axios.patch(`http://localhost:4000/todos/${id}`, { done: !todo.done ? 1 : 0 });
      const res = await axios.get("http://localhost:4000/todos");
      setTodos(res.data.map(t => ({ id: t.id, text: t.content, done: t.done === 1 })));
      gainXP(!todo.done ? 20 : -20);
    } catch (err) { console.error(err); }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/todos/${id}`);
      const res = await axios.get("http://localhost:4000/todos");
      setTodos(res.data.map(t => ({ id: t.id, text: t.content, done: t.done === 1 })));
    } catch (err) { console.error(err); }
  };

  return (
    <div style={{ background: theme.bg, minHeight: "100vh", padding: "24px", fontFamily: "'Outfit', sans-serif", color: theme.text, transition: "background 0.3s" }}>
      
      {/* 헤더 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, background: "linear-gradient(135deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Emotion RPG Life Manager
          </h1>
          <p style={{ fontSize: "12px", color: theme.subText, marginTop: "3px" }}>오늘도 좋은 하루를 만들어봐요</p>
        </div>
        <button onClick={toggleTheme} style={{ background: "none", border: `2px solid ${theme.moodBorder}`, borderRadius: "20px", padding: "5px 12px", color: theme.accentText, fontFamily: "'Outfit', sans-serif", fontSize: "12px", cursor: "pointer", fontWeight: 500 }}>
          {isDark ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>

      {/* 감정 카드 */}
      <div style={{ background: theme.moodBg, border: `1px solid ${theme.moodBorder}`, borderRadius: "16px", padding: "16px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "30px" }}>
          {data.length > 0 ? data[data.length - 1].emotion.split(" ")[0] : "😶"}
        </span>
        <div>
          <div style={{ fontSize: "13px", fontWeight: 500, color: theme.accentText }}>
            오늘의 감정 — {data.length > 0 ? data[data.length - 1].emotion : "기록 없음"}
          </div>
          <div style={{ fontSize: "11px", color: theme.subText, marginTop: "2px" }}>Character Mood</div>
        </div>
      </div>

      {/* 스탯 카드 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
        <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: "16px", padding: "16px" }}>
          <div style={{ fontSize: "11px", color: theme.subText, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px" }}>Level</div>
          <div style={{ fontSize: "26px", fontWeight: 700 }}>{level}</div>
          <div style={{ height: "6px", background: theme.xpBg, borderRadius: "3px", overflow: "hidden", marginTop: "8px" }}>
            <div style={{ height: "100%", width: `${xp}%`, background: "linear-gradient(90deg,#a78bfa,#60a5fa)", borderRadius: "3px" }} />
          </div>
          <div style={{ fontSize: "12px", color: theme.subText, marginTop: "4px" }}>XP {xp} / 100</div>
        </div>
        <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: "16px", padding: "16px" }}>
          <div style={{ fontSize: "11px", color: theme.subText, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px" }}>Today</div>
          <div style={{ fontSize: "26px", fontWeight: 700 }}>{percent}%</div>
          <div style={{ height: "6px", background: theme.xpBg, borderRadius: "3px", overflow: "hidden", marginTop: "8px" }}>
            <div style={{ height: "100%", width: `${percent}%`, background: "linear-gradient(90deg,#34d399,#60a5fa)", borderRadius: "3px" }} />
          </div>
          <div style={{ fontSize: "12px", color: theme.subText, marginTop: "4px" }}>{completed} / {total} 완료</div>
        </div>
      </div>

      {/* Daily Quests */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <span style={{ fontSize: "15px", fontWeight: 600 }}>Daily Quests</span>
        <span style={{ fontSize: "11px", background: theme.badgeBg, color: theme.accentText, padding: "3px 10px", borderRadius: "20px" }}>{total} tasks</span>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
        <input
          placeholder="새 퀘스트 입력..."
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          style={{ flex: 1, background: theme.card, border: `1px solid ${theme.border}`, borderRadius: "10px", padding: "10px 14px", color: theme.text, fontFamily: "'Outfit', sans-serif", fontSize: "14px", outline: "none" }}
        />
        <button onClick={addTodo} style={{ background: "linear-gradient(135deg,#a78bfa,#60a5fa)", border: "none", borderRadius: "10px", padding: "10px 18px", color: "#fff", fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
          + 추가
        </button>
      </div>

      {todos.map(todo => (
        <div key={todo.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", background: theme.card, border: `1px solid ${theme.border}`, borderRadius: "12px", marginBottom: "8px" }}>
          <div onClick={() => toggleTodo(todo.id)} style={{ width: "18px", height: "18px", borderRadius: "5px", border: todo.done ? "none" : `2px solid ${theme.moodBorder}`, background: todo.done ? "linear-gradient(135deg,#a78bfa,#60a5fa)" : "transparent", cursor: "pointer", flexShrink: 0 }} />
          <span style={{ flex: 1, fontSize: "14px", color: todo.done ? theme.subText : theme.text, textDecoration: todo.done ? "line-through" : "none" }}>
            {todo.text}
          </span>
          <span style={{ fontSize: "11px", color: theme.accentText, background: theme.tagBg, padding: "3px 8px", borderRadius: "20px" }}>+20 XP</span>
          <button onClick={() => deleteTodo(todo.id)} style={{ background: "none", border: "none", color: theme.subText, cursor: "pointer", fontSize: "15px" }}>✕</button>
        </div>
      ))}

      {/* 구분선 */}
      <div style={{ height: "1px", background: theme.border, margin: "20px 0" }} />

      {/* Emotion Diary */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <span style={{ fontSize: "15px", fontWeight: 600 }}>Emotion Diary</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
        <Link to="/new" style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: "14px", padding: "16px", textAlign: "center", textDecoration: "none", display: "block" }}>
          <div style={{ fontSize: "22px", marginBottom: "6px" }}>📖</div>
          <div style={{ fontSize: "12px", fontWeight: 500, color: theme.subText }}>새 기록 작성</div>
        </Link>
        <Link to="/calendar" style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: "14px", padding: "16px", textAlign: "center", textDecoration: "none", display: "block" }}>
          <div style={{ fontSize: "22px", marginBottom: "6px" }}>🗓️</div>
          <div style={{ fontSize: "12px", fontWeight: 500, color: theme.subText }}>감정 캘린더</div>
        </Link>
      </div>

      {/* 감정 통계 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <span style={{ fontSize: "15px", fontWeight: 600 }}>감정 통계</span>
      </div>
      <EmotionGraph data={data} />

    </div>
  );
}

export default Home;
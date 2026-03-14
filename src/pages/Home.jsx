import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EmotionGraph from "../components/EmotionGraph";

function Home({ data, setData, level, xp, todos, setTodos, gainXP }) {

const [todoText, setTodoText] = useState("");

/* TODOS 불러오기 */
useEffect(() => {

  const fetchTodos = async () => {

    try {

      const res = await axios.get("http://localhost:4000/todos");

      const dbTodos = res.data.map(t => ({
        id: t.id,
        text: t.content,
        done: t.done === 1
      }));

      setTodos(dbTodos);

    } catch (err) {

      console.error(err);

    }

  };

  fetchTodos();

}, []);


/* EMOTION 불러오기 */
useEffect(() => {

  const fetchEmotions = async () => {

    try {

      const res = await axios.get("http://localhost:4000/emotions");

      setData(res.data);

    } catch (err) {

      console.error(err);

    }

  };

  fetchEmotions();

}, []);


/* Today's Progress 계산 */
const completed = todos.filter(t => t.done).length;
const total = todos.length;
const percent = total ? Math.round((completed / total) * 100) : 0;


/* 할 일 추가 */
const addTodo = async () => {

  if (!todoText) return;

  try {

    await axios.post("http://localhost:4000/todos", {
      content: todoText,
      date: new Date()
    });

    const res = await axios.get("http://localhost:4000/todos");

    const dbTodos = res.data.map(t => ({
      id: t.id,
      text: t.content,
      done: t.done === 1
    }));

    setTodos(dbTodos);

    setTodoText("");

  } catch (err) {

    console.error(err);

  }

};


/* 체크 / 체크 해제 */
const toggleTodo = async (id) => {

  try {

    const todo = todos.find(t => t.id === id);

    const newDone = !todo.done;

    await axios.patch(`http://localhost:4000/todos/${id}`, {
      done: newDone ? 1 : 0
    });

    const res = await axios.get("http://localhost:4000/todos");

    const dbTodos = res.data.map(t => ({
      id: t.id,
      text: t.content,
      done: t.done === 1
    }));

    setTodos(dbTodos);

    if (newDone) {
      gainXP(20);
    } else {
      gainXP(-20);
    }

  } catch (err) {

    console.error(err);

  }

};


/* 삭제 */
const deleteTodo = async (id) => {

  try {

    await axios.delete(`http://localhost:4000/todos/${id}`);

    const res = await axios.get("http://localhost:4000/todos");

    const dbTodos = res.data.map(t => ({
      id: t.id,
      text: t.content,
      done: t.done === 1
    }));

    setTodos(dbTodos);

  } catch (err) {

    console.error(err);

  }

};


return (

<div style={{ padding: "20px" }}>

<h1>Emotion RPG Life Manager</h1>

<div style={{ marginBottom: "20px" }}>

<p>Level {level}</p>
<p>XP {xp} / 100</p>

<div style={{
width: "300px",
height: "20px",
background: "#ddd",
borderRadius: "10px",
overflow: "hidden",
marginBottom: "10px"
}}>

<div style={{
width: `${xp}%`,
height: "100%",
background: "limegreen"
}} />

</div>


<h3>💬 Character Mood</h3>

<p>
오늘 상태 :
{
  data.length > 0
  ? data[data.length - 1].emotion
  : "기록 없음"
}
</p>


{/* Today's Progress */}

<h3>📊 Today's Progress</h3>

<p>{completed} / {total} 완료</p>

<div style={{
width:"300px",
height:"10px",
background:"#ddd",
borderRadius:"5px",
overflow:"hidden",
marginBottom:"10px"
}}>

<div style={{
width:`${percent}%`,
height:"100%",
background:"limegreen"
}} />

</div>

<p>{percent}% Complete</p>


<h2>📜 Daily Quests</h2>

<input
placeholder="오늘 할 일"
value={todoText}
onChange={(e) => setTodoText(e.target.value)}
/>

<button onClick={addTodo}>추가</button>


<ul>

{todos.map((todo) => (

<li key={todo.id}>

<input
type="checkbox"
checked={todo.done}
onChange={() => toggleTodo(todo.id)}
/>

<span
style={{
marginLeft: "5px",
textDecoration: todo.done ? "line-through" : "none"
}}
>
{todo.text}
</span>

<span style={{marginLeft:"10px",color:"orange"}}>
+20 XP
</span>

<button
onClick={() => deleteTodo(todo.id)}
style={{marginLeft:"10px"}}
>
삭제
</button>

</li>

))}

</ul>


<hr />

<h2>Emotion Diary</h2>

<Link to="/new">새 기록 작성</Link>

<br />

<Link to="/calendar">
📅 감정 캘린더 보기
</Link>

</div>
<hr />
<h2>감정 통계</h2>
<EmotionGraph data={data} />
</div>




);

}

export default Home;
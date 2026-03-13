import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import New from "./pages/New";
import "./App.css";
import Calendar from "./pages/Calendar";
import DiaryPage from "./pages/DiaryPage";

function App(){

 const [data, setData] = useState([]);
 const [level, setLevel] = useState(1);




 useEffect(() => {
  const saved = localStorage.getItem("diaryData");

  if (saved) {
    setData(JSON.parse(saved));
  }
}, []);

useEffect(() => {
  localStorage.setItem("diaryData", JSON.stringify(data));
}, [data]);


 const [xp, setXp] = useState(0);
 const [todos, setTodos] = useState([]);
 const [hp, setHp] = useState(100);
const [exp, setExp] = useState(0);
const [streak, setStreak] = useState(0);

 const gainXP = (amount) => {

  const newXP = xp + amount;

  if (newXP >= 100) {
    setLevel(level + 1);
    setXp(newXP - 100);
  } else {
    setXp(newXP);
  }

 };

 return(

  <BrowserRouter>

   <Routes>

    <Route
      path="/"
      element={
        <Home
          data={data}
          setData={setData}
          level={level}
          xp={xp}
          todos={todos}
          setTodos={setTodos}
          gainXP={gainXP}
        />
      }
    />

    <Route
 path="/calendar"
 element={<Calendar data={data} />}
/>

    <Route
      path="/new"
      element={<New data={data} setData={setData} gainXP={gainXP} />}
    />

<Route
 path="/diary/:date"
 element={<DiaryPage data={data} />}
/>


   </Routes>

  </BrowserRouter>

 );

}

export default App;
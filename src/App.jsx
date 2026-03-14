import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import New from "./pages/New";
import "./App.css";
import Calendar from "./pages/Calendar";
import DiaryPage from "./pages/DiaryPage";
import Edit from "./pages/Edit";

function App(){

 const [data, setData] = useState([]);
 const [level, setLevel] = useState(1);







 const [xp, setXp] = useState(0);
 const [todos, setTodos] = useState([]);


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

<Route path="/diary/:date" element={<DiaryPage data={data} />} />
<Route path="/edit/:id" element={<Edit data={data} setData={setData} />} />  {/* ← 여기 추가 */}




   </Routes>

  </BrowserRouter>

 );

}

export default App;
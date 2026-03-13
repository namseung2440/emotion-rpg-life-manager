import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function EmotionStatistics({ data }) {

 const [period,setPeriod] = useState("week");

 const today = new Date();

 // 기간 필터
 const filteredData = data.filter((item)=>{

  const d = new Date(item.date);

  if(period==="week"){
   return (today - d) / (1000*60*60*24) <= 7;
  }

  if(period==="month"){
   return d.getMonth() === today.getMonth()
   && d.getFullYear() === today.getFullYear();
  }

 });

 // 감정 통계 계산
 const stats = {};

 filteredData.forEach((item)=>{

  if(!stats[item.emotion]){
   stats[item.emotion]=0;
  }

  stats[item.emotion]++;

 });

 // 그래프 데이터
 const chartData = Object.keys(stats).map((emotion)=>({

  name:emotion,
  value:stats[emotion]

 }));

 const COLORS = [
  "#FFC107",
  "#4CAF50",
  "#2196F3",
  "#FF5722",
  "#9C27B0"
 ];

 return(

  <div>

   <h2>Emotion Statistics</h2>

   <div style={{marginBottom:"10px"}}>

    <button onClick={()=>setPeriod("week")}>
     주간
    </button>

    <button onClick={()=>setPeriod("month")}>
     월간
    </button>

   </div>

   <PieChart width={300} height={300}>

    <Pie
     data={chartData}
     dataKey="value"
     nameKey="name"
     cx="50%"
     cy="50%"
     outerRadius={100}
     label
    >

    {chartData.map((entry,index)=>(
     <Cell key={index} fill={COLORS[index % COLORS.length]} />
    ))}

    </Pie>

    <Tooltip />
    <Legend />

   </PieChart>

  </div>

 );

}

export default EmotionStatistics;
  import { useState } from "react";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";

  function New(){

  const [emotion, setEmotion] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");

  // 캐릭터 상태
  const [hp, setHp] = useState(100);

  const navigate = useNavigate();

  const emotions = [
    "😀 매우 좋음",
    "🙂 좋음",
    "😐 보통",
    "😕 별로",
    "😞 힘듦",
    "😭 최악",
    "😡 화남",
    "😴 피곤",
    "🤒 아픔",
    "🤩 기대됨"
  ];

  // 감정 → HP 변화
  const applyEmotionEffect = (emotion) => {

    if(emotion === "😀 매우 좋음"){
    setHp(prev => prev + 5);
    }

    if(emotion === "🙂 좋음"){
    setHp(prev => prev + 2);
    }

    if(emotion === "😐 보통"){
    setHp(prev => prev);
    }

    if(emotion === "😡 화남"){
    setHp(prev => prev - 5);
    }

  };

  const handleSubmit = async () => {

    if(!emotion) return alert("감정을 선택하세요");

    // 감정 효과 적용
    applyEmotionEffect(emotion);

    await axios.post("http://localhost:4000/emotions",{
    emotion: emotion,
    content: content
    });

    navigate("/");

  };

  return(

    <div style={{padding:"20px"}}>

    <h1>감정 기록</h1>

    {/* 캐릭터 상태 표시 */}
    <div style={{marginBottom:"15px"}}>
      <strong>HP:</strong> {hp}
    </div>

    <p>오늘 기분</p>

    {emotions.map((e)=>(

      <button
        key={e}
        onClick={()=>setEmotion(e)}
        style={{
          margin:"5px",
          padding:"10px",
          borderRadius:"10px",
          border:"1px solid #ddd",
          background: emotion===e ? "#4CAF50" : "#f5f5f5",
          color: emotion===e ? "white" : "black",
          cursor:"pointer"
        }}
      >
        {e}
      </button>

    ))}

    <br/><br/>

    <input
    type="date"
    value={date}
    onChange={(e)=>setDate(e.target.value)}
  />

  <br/><br/>

  <textarea
    placeholder="오늘 있었던 일을 자유롭게 써보세요"
    value={content}
    onChange={(e) => setContent(e.target.value)}
    style={{
      width: "100%",
      height: "100px",
      marginTop: "10px",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ddd"
    }}
  />

  <br/><br/>

  <button onClick={handleSubmit}>
    저장
    </button>

        </div>

  );

}

export default New;
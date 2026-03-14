import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit({ data, setData }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const target = data.find(item => String(item.id) === String(id));

  const [emotion, setEmotion] = useState(target ? target.emotion : "");
  const [content, setContent] = useState(target ? target.content : "");

  const emotions = [
    "😀 매우 좋음", "🙂 좋음", "😐 보통", "😕 별로",
    "😞 힘듦", "😭 최악", "😡 화남", "😴 피곤", "🤒 아픔", "🤩 기대됨"
  ];

  const handleSubmit = async () => {
    if (!emotion) return alert("감정을 선택하세요");
    await axios.put(`http://localhost:4000/emotions/${id}`, {
      emotion,
      content
    });
    navigate("/");
  };

  if (!target) return <p>해당 기록을 찾을 수 없습니다.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>감정 수정</h1>
      <p>오늘 기분</p>
      {emotions.map((e) => (
        <button
          key={e}
          onClick={() => setEmotion(e)}
          style={{
            margin: "5px", padding: "10px", borderRadius: "10px",
            border: "1px solid #ddd",
            background: emotion === e ? "#4CAF50" : "#f5f5f5",
            color: emotion === e ? "white" : "black",
            cursor: "pointer"
          }}
        >
          {e}
        </button>
      ))}
      <br /><br />
      <textarea
        placeholder="오늘 있었던 일을 자유롭게 써보세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          width: "100%", height: "100px", marginTop: "10px",
          padding: "10px", borderRadius: "8px", border: "1px solid #ddd"
        }}
      />
      <br /><br />
      <button onClick={handleSubmit}>수정 완료</button>
    </div>
  );
}

export default Edit;
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function DiaryPage({ data }) {

 const { date } = useParams();

 // 날짜 UTC 문제 방지
 const selectedDate = new Date(date + "T00:00:00");

 // 해당 날짜 기록 찾기
 const diary = data.find((item) => {
  return (
   new Date(item.date).toDateString() ===
   selectedDate.toDateString()
  );
 });

 return (

  <div style={{ padding: "20px" }}>

   <h1>{date} 기록</h1>

   {diary ? (

    <div>

     <h3>감정</h3>
     <p>{diary.emotion}</p>

     <hr />

 <h3>일기 내용</h3>
<p>{diary.content ? diary.content : "내용 없음"}</p>

    </div>

   ) : (

    <p>이 날짜에는 기록이 없습니다.</p>

   )}

   <br />

   <Link to="/calendar">캘린더로 돌아가기</Link>

  </div>

 );

}

export default DiaryPage;
import CalendarView from "../components/CalendarView";
import { Link } from "react-router-dom";

function Calendar({ data }) {

  return (

    <div style={{ padding: "20px" }}>

      <h1>Emotion Calendar</h1>

      <Link to="/">← 홈으로</Link>

      <CalendarView data={data} />

    </div>

  );

}

export default Calendar;
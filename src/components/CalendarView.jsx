import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";

function CalendarView() {

  const navigate = useNavigate();

const formatDate = (date) => {
  return date.toLocaleDateString("sv-SE");
};

  const handleClick = (value) => {
    const date = formatDate(value);
    navigate(`/diary/${date}`);
  };

  return (
    <div>
      <Calendar onClickDay={handleClick} />
    </div>
  );
}

export default CalendarView;
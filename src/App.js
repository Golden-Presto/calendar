import { Calendar } from "@homagni/gp-calendar";
import "@homagni/gp-calendar/dist/gp-calendar.css"; 

function App() {
  return (
    <div style={{ height: "500px", width: "600px", margin: "20px auto" }}>
      <Calendar
        fontColor="#259cabff" 
        backgroundColor="#815286ff" 
        todayColor="#ee1a1aff" 
        primaryColor="#9ce781ff"
        accentColor="#ffff00"
        events={[
          { id: "1", date: new Date(2024, 11, 5), title: "Team Meeting" },
          { id: "2", date: new Date(2024, 11, 10), title: "Project Deadline" },
          { id: "3", date: new Date(2024, 11, 25), title: "Christmas" },
          { id: "4", date: new Date(2024, 11, 31), title: "New Year's Eve" }
        ]}
      />
    </div>
  );
}

export default App;
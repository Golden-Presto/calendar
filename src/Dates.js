const Dates = ({ week, newDate, newWeek, presentDay }) => {
    
    return (
      <tr key={newWeek.id}>
          {week.map((date, j) => (
              <Date date={date} keyDate={newDate.id} className={presentDay===date ? "presentDay" : ""}/>
          ))}
      </tr>
    )
  }
  
  export default Dates
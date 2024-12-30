import './App.css';
import { format, getDay } from "date-fns"
import { useState, useEffect } from 'react';


function App() {

  const presentDay = format(new Date(), "dd").padStart(2, '0');
  const presentMonth = format(new Date(), "MMMM").padStart(2, '0');
  const presentYear = format(new Date(), "yyyy").padStart(2, '0');
  const [dates, setDates] =useState([]);
  const day= format(new Date(), "E");
  const [month, setMonth] = useState(format(new Date(), "MMMM"));
  const [year, setYear] = useState(Number(format(new Date(), "yyyy")));
  const [monthNum, setMonthNum] = useState(Number(format(new Date(), "MM")));
  const gap = getDay(new Date(year, (monthNum-1), 1));
  //const gap = getDay(new Date(year, (monthNum-1), 1));
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  useEffect(() => {
    const daysInMonth = monthNum === 4 || monthNum === 6 || monthNum === 9 || monthNum === 11 ? 30 : 
                        monthNum === 2 ? (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28 :
                        31;
    const newGap = getDay(new Date(year, monthNum - 1, 1));
    const adjustedGap = newGap === 0 ? 6 : newGap - 1;
    const gapArray = Array(adjustedGap).fill("");
    setDates(prevDates => {
      // Clear the previous dates and gap
      const newDates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
      return [...gapArray, ...newDates];
    });
  },[monthNum, year])
  
  const chunk = (array, size) => {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
      chunked.push(array.slice(i, i + size));
    }
    return chunked;
  }

  // useEffect(() => {
  //   const gapArray = Array(gap - 1).fill("");
  //   setDates(prevDates => [...gapArray, ...prevDates]);
  // }, []);
  
  const handleDecrease = () => {
    let newMonthNum = monthNum-1;
    if(newMonthNum<1) {
      newMonthNum=12;
      setYear(year-1);
    }
    //console.log(newMonthNum)
    setMonthNum(newMonthNum);
    setMonth(months[newMonthNum-1]);
  }

  const handleIncrease = () => {
    let newMonthNum = monthNum+1;
    if(newMonthNum>12) {
      newMonthNum=1;
      setYear(year+1);
    }
    //console.log(newMonthNum);
    setMonthNum(newMonthNum);
    setMonth(months[newMonthNum-1]);
  }

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10); // Convert string to number
    if (!isNaN(newYear)) {
      setYear(newYear);
    }
  }

  const weeks = chunk(dates, 7);
  console.log(month)

  const handleReset = () => {
    setMonth(format(new Date(), "MMMM"));
    setMonthNum(Number(format(new Date(), "MM")));
    setYear(Number(format(new Date(), "yyyy")));

  }

  return (
    <main>
      <div className='header flex-item'>
        
        <form id='yearForm'>
          <input
            id='year'
            type='text' 
            value={year}
            onChange={handleYearChange}
          />
        </form>
        
      </div> 
      <div className='month flex-item'>
        <button onClick={handleDecrease}>&lt;</button>
        <div className='monthName'>{month}</div>
        <button onClick={handleIncrease}>&gt;</button>
      </div>
      <table id='days' className='flex-item'>
        <tbody>
          <tr>
                <td>Mon</td>
                <td>Tue</td>
                <td>Wed</td>
                <td>Thu</td>
                <td>Fri</td>
                <td>Sat</td>
                <td>Sun</td>
              </tr>
          {weeks.map((week, i) => (
            <tr key={i}>
              {week.map((date, j) => {
                const dateStr = date.toString().padStart(2, '0');
                return (
                  <td key={j} className={(dateStr === presentDay)&&(month==presentMonth)&&(year==presentYear) ? "presentDay" : ""}>{date}</td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <footer>
        {presentMonth==month&&presentYear==year ? <div className='day'>{day}</div> : <button onClick={handleReset}>Hello</button>}
      </footer>

    </main>

)
}

export default App
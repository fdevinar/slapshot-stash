// export async function fetchCards() {    
//     const response = await fetch("http://localhost:8080/cards");
//     const data = await response.json();
//     if (data) {
//         console.log("Fetched cards:");
//         console.log(data);
//     }
//     // setRuns(data);
//     return data;
//   }

  
//   async function runSchedule(schedule = randomRequest) {    
//     const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(schedule)
//       };
//     const response = await fetch('http://localhost:8080/schedule/execute',requestOptions);
//     const data = await response.json();
//     // console.log(data);
//     fetchRuns();
//   }
  
  
const daysTagL = document.querySelector(".days"),
  daysTagR = document.querySelector(".days-test"),
  currentDateL = document.querySelector(".current-date"),
  currentDateR = document.querySelector(".current-date-test"),
  prevNextIconL = document.querySelectorAll(".icons span"),
  prevNextIconR = document.querySelectorAll(".icons-test span");

//** further use **//
const displayDate = document.querySelector(".search");
// $(document).ready(function () {
//   $(".search31").click(function () {
//     $(".postDate31").val(function () {
//       return "2023/08/18";
//     });
//   });
// });

// $(".ddd").click(function (e) {
//   $(".postDate31").val("2023/08/18");
// });

// getting new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();
let matchDate = currYear + "/" + (currMonth + 1) + "/" + date.getDate();
console.log(matchDate);

// storing full name of all months in array
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
/* LEFT calendar */
const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month

  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    liTag += `
    <li class="inactive"> ${lastDateofLastMonth - i + 1}</li>`;
  }
  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    //export current Date
    let currentDate = currYear + "/" + (currMonth + 1) + "/" + i;
    // console.log(currentDate);

    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    // liTag += `<li class="${isToday}" value="">${i}</li>`;
    liTag += `
    <li class="${isToday}">
    <form action="/bookings/add" method="post">
    <input
    id="bookingDate"
    class="postDate"
    name="bookingDate"
    type="hidden"
    value="${currentDate}"
    >
    <button
    class="search"
    value="checkSessions"
    name="action"
    type="submit"
    >${i}</button>
    </form>
    </li>
    `;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDateL.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
  daysTagL.innerHTML = liTag;
  // currentDateR.innerText = `${months[currMonth]} ${currYear}`;
  // daysTagR.innerHTML = liTag;
};
renderCalendar();

prevNextIconL.forEach((icon) => {
  // getting prev and next icons
  icon.addEventListener("click", () => {
    // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }
    renderCalendar(); // calling renderCalendar function
  });
});
/* RIGHT calendar */
const renderCalendarRight = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
  let liTagR = "";
  let postDate = [];

  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    liTagR += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    //export current Date
    let currentDate = currYear + "/" + (currMonth + 1) + "/" + i;
    postDate.push(currentDate);

    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTagR += `
    <li class="${isToday}">
    <form action="/bookings/add" method="post">
    <input
    id="bookingDate"
    class="postDate"
    name="bookingDate"
    type="hidden"
    value="${currentDate}"
    >
    <button
    class="search"
    value="checkSessions"
    name="action"
    type="submit"
    >${i}</button>
    </form>
    </li>
    `;
  }
  console.log(postDate[0]);

  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    liTagR += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  // currentDateL.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
  // daysTagL.innerHTML = liTag;
  //** debug for showing 2 calendar **/
  currentDateR.innerText = `${months[currMonth]} ${currYear}`;
  daysTagR.innerHTML = liTagR;
};
renderCalendarRight();

prevNextIconR.forEach((icon) => {
  // getting prev and next icons
  icon.addEventListener("click", () => {
    // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }
    renderCalendarRight(); // calling renderCalendar function
  });
});

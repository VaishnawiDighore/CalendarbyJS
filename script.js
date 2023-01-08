function generate_years(start, end) {
  let years = "";
  for (let year = start; year <= end; year++) {
    years += "<option value='" + year + "'>" + year + "</option>";
  }
  return years;
}
let today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");
createYear = generate_years(1970, 2070);
document.getElementById("year").innerHTML = createYear;
let calendar = document.getElementById("calendar");
let lang = calendar.getAttribute("data-lang");
let months = "";
let days = "";
let myDays;

const monthDefault = [
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

const dayDefault = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

if (lang == "en") {
  months = monthDefault;
  days = dayDefault;
}

let $dataHead = "<tr>";
for (dhead in days) {
  $dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
}
$dataHead += "</tr>";
document.getElementById("header-month").innerHTML = $dataHead;
monthAndYear = document.getElementById("monthYear");
console.log(monthYear);
showCalendar(currentMonth, currentYear);

function jumpToTheDate() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
  let firstDay = new Date(year, month).getDay();
  table_body = document.getElementById("calendar-body");

  table_body.innerHTML = "";
  monthAndYear.innerText = months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;
  let date = 1;
  for (let i = 0; i <= 6; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        cell = document.createElement("td");
        cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth(month, year)) {
        break;
      } else {
        cell = document.createElement("td");
        cell.setAttribute("data-date", date);
        cell.setAttribute("data-month", month + 1);
        cell.setAttribute("data-year", year);
        cell.setAttribute("data-month_name", months[month]);
        cell.className = `date-picker ${date}`;
        cell.innerHTML = "<span>" + date + "</span>";
        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          cell.className = "date-picker selected";
        }
        row.appendChild(cell);
        date++;
      }
    }
    table_body.appendChild(row);
  }
}

function dateAt(myDate) {
  const value = document.getElementById("value").value;
  const elementsForValues = document.getElementsByClassName(value);
  const allElements = document.getElementsByClassName("sel");
  if (value >= myDate || value < 1) {
    alert("Enter a valid date!");
  } else {
    if (allElements.length >= 1) {
      allElements[0].classList.remove("sel");
      elementsForValues[0].className += " sel";
    } else {
      if (elementsForValues[0].className.split(" ").includes("sel")) {
        elementsForValues[0].classList.remove("sel");
        elementsForValues[0].className += " white";
      } else {
        elementsForValues[0].className += " sel";
      }
    }
  }
}
const btn = document.getElementsByClassName("enter");
btn[0].addEventListener("click", () => dateAt(myDate));
const elements = document.getElementsByTagName("td");
function daysInMonth(Month, Year) {
  myDate = 32 - new Date(Year, Month, 32).getDate();
  return myDate;
}

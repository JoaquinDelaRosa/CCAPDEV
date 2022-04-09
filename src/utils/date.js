const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function parseDate(date){
    const day = DAYS[date.getDay()];
    const month = MONTHS[date.getMonth()];

    var numdate = date.getDate().toString();
    numdate = (numdate.length === 1 ? "0" + numdate : numdate);

    return day + " " + month + " " + numdate + " " + date.getFullYear();
}

export default parseDate;
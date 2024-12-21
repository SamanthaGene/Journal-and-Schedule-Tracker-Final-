const currentDate = document.querySelector(".current-date");

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July", 
                "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    console.log(lastDateofMonth);

    for (let i = 0; i < array.length; i++) {
        const element = array[i];
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`; 
}
renderCalendar();
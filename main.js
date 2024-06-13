function getGreeting() {
    const currentDate = new Date();
    const hours = currentDate.getHours();

    if (hours >= 5 && hours < 12) {
        return "Chào buổi sáng!";
    } else if (hours >= 12 && hours < 18) {
        return "Chào buổi chiều!";
    } else {
        return "Chào buổi tối!";
    }
}

function getDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    return ` ${day}/${month}/${year}`;
}

function updateTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const timeString = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('time').textContent = timeString;
}

function updateGreeting() {
    const greeting = getGreeting();
    document.getElementById('greeting').textContent = greeting;
}

function updateDate() {
    const dateString = getDate();
    document.getElementById('date').textContent = dateString;
}

setInterval(updateTime, 1000);
setInterval(updateGreeting, 1000);
setInterval(updateDate, 1000);
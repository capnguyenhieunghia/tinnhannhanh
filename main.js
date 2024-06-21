// Hàm lấy lời chào dựa trên thời gian trong ngày
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

// Hàm cập nhật background dựa trên thời gian trong ngày
function updateBackground() {
    const currentDate = new Date();
    const hours = currentDate.getHours();

    let backgroundClass;
    if (hours >= 5 && hours < 12) {
        backgroundClass = 'morning-background';
    } else if (hours >= 12 && hours < 18) {
        backgroundClass = 'afternoon-background';
    } else {
        backgroundClass = 'evening-background';
    }

    document.body.className = backgroundClass;
}

// Hàm cập nhật lời chào và background
function updateGreeting() {
    const greeting = getGreeting();
    document.getElementById('greeting').textContent = greeting;
    updateBackground();
}

// Gọi hàm updateGreeting() mỗi giây để cập nhật lời chào và background
setInterval(updateGreeting, 1000);

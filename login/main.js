document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");
    const message = document.getElementById("message");

    // Thêm danh sách tên người dùng, mật khẩu và loại người dùng
    const users = {
        "dang": {
            "password": "dang123",
            "type": "user"
        },
        "duyen": {
            "password": "duyen123",
            "type": "admin"
        },
        "nghia": {
            "password": "nghia123",
            "type": "admin"
        },
        "huy": {
            "password": "huy123",
            "type": "user"
        },
        "le": {
            "password": "le123",
            "type": "user"
        }
    };

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Kiểm tra xem tên người dùng và mật khẩu có khớp với dữ liệu trong object users không
        if (users.hasOwnProperty(username) && users[username].password === password) {
            // Nếu thông tin đăng nhập đúng, kiểm tra loại người dùng
            if (users[username].type === "admin") {
                // Chuyển hướng đến trang admin
                window.location.href = "./admin/index.html";
            } else {
                // Chuyển hướng đến trang user
                window.location.href = "./user/index.html";
            }
        } else {
            message.textContent = "Tên người dùng hoặc mật khẩu không hợp lệ.";
        }
    });
});
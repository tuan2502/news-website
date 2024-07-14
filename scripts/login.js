'use strict'


// Hàm đăng nhập
function loginUser(data) {
    try {
        if (!data) return;
        const { username, password } = data;
        const [userLogin] = userArr.filter(user => user.username === username && user.password === password );
        if (userLogin) {
            saveToStorage(USER_LOGIN, userLogin);
            window.location.href = '../index.html';
        } else {
            alert('Username or password is not correct!')
        }
        return userLogin;
    } catch (error) {
        console.error(error);
    }
}
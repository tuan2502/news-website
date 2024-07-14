'use strict'

function registerUser(data) {
    try {
        if(!data) return;
        const user = parseUser(data);
        userArr.push(user);
        saveToStorage(KEY, userArr);
		window.location.href = '../pages/login.html';
    } catch (error) {
        console.error(error);
    }

}
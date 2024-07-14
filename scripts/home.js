'use strict'

const loginModal = document.getElementById('login-modal');
const mainContent = document.getElementById('main-content');
const welcomeMessage = document.getElementById('welcome-message');
const btnLogout = document.getElementById('btn-logout');

//Hàm check giao diện login
function checkLogin() {
    if (Object.keys(userLogin).length) {
        loginModal.setAttribute('hidden', false);
        welcomeMessage.textContent = `Welcome ${userLogin.firstName} ${userLogin.lastName}`;
        return true;
    } else {
        loginModal.removeAttribute('hidden');
        mainContent.setAttribute('hidden', true);
        return false;
    }
}

function logout() {
    if (checkLogin()) {
        removeOutStorage(USER_LOGIN);
        window.location.reload();
    } else {
        alert('Error! Please load page again!');
    }
}

checkLogin();

btnLogout.onclick = () => {
    logout();
};
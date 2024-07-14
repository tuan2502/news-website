'use strict'

const KEY = 'USER_ARRAY';
const USER_LOGIN = 'USER_LOGIN';
// Đổi key api nếu không sử dụng được 
const KEY_NEWS_API = 'c2eff13ec73b43fa80dd6b3b18c6d5ca';
const url_api = 'https://newsapi.org/v2';
const TOTAL_TASK = 'TOTAL_TASK';


function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(error);
    }
}

function getFromStorage(key, defaultVal) {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? defaultVal;
    } catch (error) {
        console.error(error);
    }
}

function removeOutStorage(key) {
    try {
        return localStorage.removeItem(key);;
    } catch (error) {
        console.error(error);
    }
}

//Xử lý đầu vào dữ liệu đầu vào khi khởi động ứng dụng
if (!localStorage.getItem(KEY, [])) {
    const accounts = [
        new User('admin', 'Nguyen', 'admin', 'admin'),
        new User('tuan', 'nguyen', 'tuan2502', 'tuan2502'),
        new User('Nguyen', 'Tuan', 'tuan1234', 'tuan1234')
    ]
    const newAccounts = accounts.map(account => {
        return parseUser(account);
    });
    saveToStorage(KEY, newAccounts);
}

if (!localStorage.getItem(TOTAL_TASK, [])) {
    const tasks = [
        new Task('Vệ sinh cá nhân', 'tuan1234', true),
        new Task('Ăn sáng', 'tuan1234', false),
        new Task('Làm việc', 'tuan1234', false),
        new Task('Ăn trưa', 'tuan1234', false),
        new Task('Thể dục', 'tuan2502', false),
        new Task('Vệ sinh cá nhân', 'tuan2502', true),
        new Task('Làm việc', 'tuan2502', false),
        new Task('Đi ngủ ', 'tuan2502', false)
    ];
    const newTasks = tasks.map(task => {
        return parseTask(task);
    });
    saveToStorage(TOTAL_TASK, newTasks);
}



if (!localStorage.getItem('settings', [])) {
    const setting = {
        newsPerPage: 20,
        newsCategory: 'general',
    };
    saveToStorage('settings', setting);
}


// const setting = {
//     newsPerPage: 20,
//     newsCategory: 'general',
// };

// saveToStorage('settings', setting);

let userArr = getFromStorage(KEY, []);
const userLogin = getFromStorage(USER_LOGIN, {});
let settings = getFromStorage('settings', {});
let taskArr = getFromStorage(TOTAL_TASK, []);


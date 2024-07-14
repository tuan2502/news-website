'use strict'

const inputTask = document.getElementById('input-task');
const todoList = document.getElementById('todo-list');
const btnAdd = document.getElementById('btn-add');

//Thêm Task
const handleAddTask = () =>{
    if(!inputTask.value) return alert('Please input task');
    if(!Object.keys(userLogin).length) return alert('Please login before add todo list');
    todoList.innerHTML += `<li>${inputTask.value}<span class="close">×</span></li>`;
    const newTask = {
        task: inputTask.value,
        owner: userLogin.username,
        isDone: false,
    }
    taskArr.push(parseTask(newTask));
    saveToStorage(TOTAL_TASK, taskArr);
    inputTask.value='';
    renderTasks();
    handleClickDone();
    removeTask();
};



//Xử lý sự kiện khi nhấn btn add or Enter
btnAdd.onclick = handleAddTask;
window.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); 
        handleAddTask();
    }
});

const renderTasks = () => {
    todoList.innerHTML = '';
    taskArr.forEach((el, index) => {
        if (el.owner === userLogin.username) {
            let html
            if (el.isDone) {
                html = `<li id="${index + 1}" class="checked">${el.task}<span class="close">×</span></li>`
            } else {
                html = `<li id="${index + 1}">${el.task}<span class="close">×</span></li>`
            }
            todoList.innerHTML += html;
        }
    })
    return taskArr;
};


const handleClickDone = async () => {
    const liElements = document.querySelectorAll('#todo-list li');
    liElements.forEach((el) => {
        el.addEventListener('click', () => {
            // Xử lý khi click vào từng phần tử li ở đây
            console.log(el);
            const newTaskArr = taskArr.filter((_, i) => {
                if (i === parseInt(el.id) - 1){
                    el.classList.toggle('checked');
                    taskArr[i].isDone = !taskArr[i].isDone;
                    return saveToStorage(TOTAL_TASK, taskArr);
                }
            });
        });
    });
}

/**
 * Xử lý xóa Task
 * 1. query toàn bộ danh li trong todo-list
 * 2. forEach từng thẻ li và tìm span trong li
 * 3. dừng event bên ngoài thẻ span
 * 4. tạo danh sách mới rồi filter nếu index của taskArr !== id của phần tử li hiện tại thì gán vào danh sách mới
 * 5. gán taskArr = newTask
 * 6. xóa phần tử li hiện tại
 * 7. Lưu vào localStorage
 */
const removeTask = () => {
    const liElements = document.querySelectorAll('#todo-list li');
    liElements.forEach(el => {
        const removeBtn = el.querySelector('span');
        removeBtn.addEventListener('click', (e) => {
            // Xử lý khi click vào từng phần tử span ở đây
            e.stopPropagation();
            const newTaskArr = taskArr.filter((_, i) => i !== parseInt(el.id)-1);
            taskArr = newTaskArr;
            el.remove();
            saveToStorage(TOTAL_TASK, taskArr);
        });
    });
}

renderTasks();
handleClickDone();
removeTask();








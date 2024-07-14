'use strict';



const newsContainer = document.getElementById('news-container');
const card = document.querySelector('.card');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
const pageNum = document.getElementById('page-num');

let totalPages = 0;
let currentPage = 1;

let newsPerPage = 20;
let newsCategory = '';




// Hàm hiển thị danh sách articles
const displayArticles = async (articles) => {
    try {
        let cardsList = await articles
            ?.filter(article => article.urlToImage !== null)
            ?.map(article => {
                return `
                <div class="flex-row flex-wrap">
                    <div class="card mb-3" style="">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <img 
                                    src="${article.urlToImage}"
                                    class="card-img d-block h-100"
                                    alt="${article.title}">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${article.title}</h5>
                                    <p class="card-text">${article.description}</p>
                                    <a 
                                        href="${article.url}"
                                        class="btn btn-primary"
                                        target='_blank'
                                    >View</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            })
        const dataList = await Promise.all([cardsList]);
        return newsContainer.innerHTML = dataList.join('');
    } catch (error) {
        console.log(error);
    }
}

// Hàm xử lý nextPage;
const nextPage = () => {
    try{
        if (currentPage < totalPages) {
            btnNext.style.display = 'block';
            btnPrev.style.display = 'block';
            currentPage++;
            pageNum.textContent = currentPage;
        }
        if (currentPage === totalPages) {
            btnPrev.style.display = 'block';
            btnNext.style.display = 'none';
        }
        return currentPage;
    }catch (error) {
        console.error(error);
    }
}

// Hàm xử lý previousPage;
const previousPage = () => {
    try {
        if (currentPage <= totalPages) {
            btnPrev.style.display = 'block';
            currentPage--
            pageNum.textContent = currentPage;
        }
        if (currentPage === 1){
            btnPrev.style.display = 'none';
            btnNext.style.display = 'block';
        }
        return currentPage;
    } catch (error) {
        console.error(error);
    }
   
}

function Validator(options) {
    // Tạo Object để lưu rules vào
    let selectorRules = {};
    let formElement = document.querySelector(options.form);
    let errorElement;

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        let errorMessage;
        // Lấy các rule của selectorRules
        let rules = selectorRules[rule.selector];

        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng kiểm tra
        for (let i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        };

        if (errorMessage) {
            errorElement.innerText = errorMessage;
        } else {
            errorElement.innerText = '';
        };
        return !errorMessage;
    }

    // Hàm thực hiện clear form
    function clearForm(enableInputs) {
        for (let enableInput of enableInputs) {
            if (enableInput.type === 'checkbox') {
                enableInput.checked = false;
            } else if (enableInput.type === 'color') {
                enableInput.value = '#000000';
            } else {
                enableInput.value = '';
            }
        }
    }

    //Hàm thêm ngày nhập dữ liệu
    function formattedDate() {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`
    }

    if (formElement) {
        // Submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();
            let isFormValid = true;
            options.rules.forEach(function (rule) {
                const inputElement = formElement.querySelector(rule.selector);
                const isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });
            if (isFormValid) {
                if (typeof options.onSubmit === 'function') {
                    let enableInputs = formElement.querySelectorAll('input[name]');
                    let formValues = Array.from(enableInputs).reduce((values, input) => {
                        // Xử lý type của đầu vào là gì
                        let inputName = input.name;
                        if (input.type === 'checkbox') {
                            values[inputName] = input.checked;
                        }else if(input.type === 'select-one'){
                            values[inputName] = input.options[input.selectedIndex].textContent;
                        }else{
                            values[inputName] = input.value
                        }
                        return values;
                    }, {});
                    // formValues.createdDate = new Date();
                    options.onSubmit(formValues);
                    clearForm(enableInputs);
                } else {
                    // submit với mặc định của trình duyệt
                    formElement.submit()
                }
            }

        }

        options.rules.forEach(rule => {
            // Lưu lại các rules cho mỗi input
            // Nếu rule.test là mảng thì lưu giá trị rule.test thứ 2 trở lên vào
            // Nếu không tạo mảng và lưu giá trị vào
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            const inputElement = formElement.querySelector(rule.selector);
            // Xử lý khi người dùng blur thì xác định value có lỗi hay không và trả ra msg
            inputElement.onblur = () => {
                validate(inputElement, rule);
            }

            // Xử lý khi người dùng nhập vào input
            inputElement.oninput = () => {
                let errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                errorElement.innerHTML = '';
            }
        })
    }
}

/**
 * Tạo rules để xác định validate cần thực hiện
 * Định nghĩa và Nguyên tắc rules
 * 1. Khi có lỗi => trả ra msg lỗi
 * 2. Khi hợp lệ => Không trả ra gì cả (undefined)
 */
Validator.isRequired = function (selector, message) {
    return {
        selector, test: function (value) {
            return value.trim() ? undefined : message || 'Please input!';
        }
    }
}

Validator.isMinMax = function (selector, min, max, message) {
    return {
        selector, test: function (value) {
            return value >= min && value <= max ? undefined : message || `Must be between ${min} and ${max}`;
        }
    }
}

Validator.isDuplicate = function (selector, checkDuplicate, message) {
    return {
        selector, test: function (value) {
            return checkDuplicate() ?  undefined : message || `${value} is existed`;
        }
    }
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Dữ liệu nhập vào không chính xác'
        }
    }
}

Validator.minLength = function (selector, min, message) {
    return {
        selector,
        test: function (value) {
            return value.length >= min ? undefined :  message || `Vui lòng nhập tối thiểu ${min} kí tự`
        }
    }
}
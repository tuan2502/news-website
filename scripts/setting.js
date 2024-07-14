'use strict'

/**
 * Xử lý setting
 * 1. Lấy giá trị newPerPage và newCategory từ localStorage
 * 2. Thay đổi giá trị newPerPage và newCategory
 * 3. Lưu giá trị đó lên lại localStorage
 */

const inputPageSize = document.getElementById('input-page-size');
const inputCategory = document.getElementById('input-category');
const btnSetting = document.getElementById('btn-submit');

inputPageSize.value = settings.newsPerPage || 20;
inputCategory.value = settings.newsCategory || 'general';

btnSetting.onclick = function(){
    try {
        let inputNewsPerPage = inputPageSize.value;
        let inputNewsCategory = inputCategory.value;
        if(inputNewsPerPage < 1 || inputNewsPerPage >= 100) return alert('Page size must be between 1 and 100');
        const newSettings = Object.create(settings);
        newSettings.newsPerPage = inputNewsPerPage;
        newSettings.newsCategory = inputNewsCategory;
        saveToStorage('settings', newSettings)
        return alert('Setting changed successfully!');
    } catch (error) {
        console.error(error);
    }
}

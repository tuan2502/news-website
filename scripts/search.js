'use strict';

// set lại trạng thái tổng trang và trang hiện tại
totalPages = 0;
currentPage = 1;
btnPrev.style.display = 'none';
pageNum.textContent = currentPage;
const inputQuery = document.getElementById('input-query');
const btnSubmit = document.getElementById('btn-submit');
let query;

btnSubmit.addEventListener('click', function(){
    let value = inputQuery.value;
    query = value;
    searchNews();
    return query;
});

window.addEventListener('keypress', function(e){
    if (e.key === 'Enter') {
        e.preventDefault();
        let value = inputQuery.value;
        query = value;
        searchNews();
        return query;
    }
});
const searchNews = async (page = 1) => {
    try {
        const response = await fetch(`${url_api}/everything?q=${query}&pageSize=${settings.newsPerPage || 20}&page=${page}&apiKey=${KEY_NEWS_API}`);
        const data = await response.json();
        totalPages = Math.ceil(data.totalResults / settings.newsPerPage || 20);
        if (totalPages === 1) {
            btnNext.style.display = 'none';
            btnPrev.style.display = 'none';
        }
        const articles = data.articles;
        return await displayArticles(articles);
    } catch (error) {
        console.log(error);
    }
}
searchNews();

btnPrev.addEventListener('click', async () => {
    previousPage();
    await searchNews(currentPage);
});
btnNext.addEventListener('click', async () => {
    nextPage();
    await searchNews(currentPage);
});
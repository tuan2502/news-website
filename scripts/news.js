'use strict'

// set lại trạng thái tổng trang và trang hiện tại
totalPages = 0;
currentPage = 1;
btnPrev.style.display = 'none';
pageNum.textContent = currentPage;

const getNews = async (country = 'us', page = 1) => {
    try {
        const response = await fetch(`${url_api}/top-headlines?country=${country}&category=${settings.newsCategory|| 'general'}&pageSize=${settings.newsPerPage || 10}&page=${page}&apiKey=${KEY_NEWS_API}`);
        const data = await response.json();
        totalPages = Math.ceil(data.totalResults / settings.newsPerPage);
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

getNews('us');

btnPrev.addEventListener('click', async () => {
    previousPage();
    await getNews('us', currentPage);
});
btnNext.addEventListener('click', async () => {
    nextPage();
    await getNews('us', currentPage);
});
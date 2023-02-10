window.addEventListener("load", () => {
  const loader = document.getElementById("circularLoader");

  const fetchData = async (topic) => {
    loader.style.visibility = "visible";
    const URL = `https://newsdata.io/api/1/news?apikey=pub_168417742d9644a223398d15b7ef7b01af55e&language=en&q=${topic}`;
    const response = await fetch(URL);

    const data = await response.json();

    loader.style.visibility = "hidden";
    return data;
  };

  const pagesTopic = ["Top News", "Economic", "Technology", "Sport", "Health"];

  currentPage = 1;

  const newsContainer = document.getElementById("news-section");

  const pageID = document.getElementById("page-id");
  const pageTitle = document.getElementById("page-title");
  const renderHeader = () => {
    pageID.innerHTML = "";
    pageTitle.innerHTML = "";
    pageID.innerHTML = currentPage;
    pageTitle.innerHTML = pagesTopic[currentPage - 1];
  };
  renderHeader();
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");

  if (currentPage !== 1) {
    document.getElementById("header-main-page").style.display = "none";
    document.getElementById("alt-header").style.display = "flex";
    prevButton.style.visibility = "hidden";
  } else {
    document.getElementById("header-main-page").style.display = "block";
    document.getElementById("alt-header").style.display = "none";
    prevButton.style.display = "visible";
  }

  prevButton.addEventListener("click", () => {
    if (currentPage - 1 > 0) {
      currentPage -= 1;
    }

    renderHeader();

    if (currentPage !== 1) {
      document.getElementById("header-main-page").style.display = "none";
      document.getElementById("alt-header").style.display = "flex";
    } else {
      document.getElementById("header-main-page").style.display = "block";

      document.getElementById("alt-header").style.display = "none";
    }
    newsContainer.innerHTML = "";

    renderNews();
  });

  nextButton.addEventListener("click", () => {
    if (currentPage + 1 < pagesTopic.length) {
      currentPage += 1;
    }
    renderHeader();
    if (currentPage !== 1) {
      document.getElementById("header-main-page").style.display = "none";
      document.getElementById("alt-header").style.display = "flex";
    } else {
      document.getElementById("header-main-page").style.display = "block";
      document.getElementById("alt-header").style.display = "none";
    }
    newsContainer.innerHTML = "";
    renderNews();
  });

  const createNews = (title, content, imgURL, link) => {
    if (imgURL == null) {
      const newsItem = document.createElement("div");

      newsItem.classList.add("news-item");
      newsItem.innerHTML = `
    <div class="news-item-content">
      
      <a href=${link} target="_blank" rel="noopener noreferrer" style='font-size:2rem;margin-bottom:5px;font-weight:bold'>${title}</a href=${link}>
     
  
      <p>${content}</p>
    </div>
  `;
      newsContainer.appendChild(newsItem);
    } else {
      const newsItem = document.createElement("div");

      newsItem.classList.add("news-item");
      newsItem.innerHTML = `
    <div class="news-item-content">
      
      <a href=${link} target="_blank" rel="noopener noreferrer" style='font-size:2rem;margin-bottom:5px;font-weight:bold'>${title}</a href=${link}>
      <img class="news-item-img"  src="${imgURL}" alt=''}">
  
      <p>${content}</p>
    </div>
  `;
      newsContainer.appendChild(newsItem);
    }
  };

  renderNews = async () => {
    newsContainer.innerHTML = "";

    let newsData = await fetchData(pagesTopic[currentPage - 1]);
    newsData = newsData.results;

    for (let iterator = 0; iterator < newsData.length; iterator++) {
      createNews(
        newsData[iterator].title,
        newsData[iterator].content,
        newsData[iterator].image_url,
        newsData[iterator].link
      );
    }
  };
  renderNews();
});

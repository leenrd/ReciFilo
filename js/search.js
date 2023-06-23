const sectionResults = document.getElementById("searchResults")
const searchBtn = document.getElementById("searchBtn");



searchBtn.addEventListener("click", () => {
    console.log("clickedSearch");
    apiReq()
})

const apiReq = async () => {
    const searchInput = document.getElementById("searchBar")
    const APP_ID = "a7bcdd71";
    let API_KEY = "2f3291ec2a896239f90605d217897ca3"
    let response = await fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${searchInput.value}`);
    let data = await response.json();
    let recipes = data.hits;
    sectionResults.innerHTML = " "
    recipes.forEach((item) => {
        let rep = item.recipe
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${rep.image}" alt="Image" class="card-image">
            <div class="card-content">
                <h2 class="card-title">${rep.label}</h2>
                <p class="card-description">${rep.source}</p>
                <a href="${rep.url}" class="card-link" target="_blank">Read More</a>
                <button class="bookmark-btn">Bookmark</button>
            </div>
        `;
        sectionResults.appendChild(card);
    })

    const bookmarkBtns = document.querySelectorAll(".bookmark-btn");

    bookmarkBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        const card = event.target.closest(".card");
        const bookmarkBtn = card.querySelector(".bookmark-btn");
        const isBookmarked = card.classList.toggle("bookmarked");
        const recipeCardHTML = card.outerHTML;

        if (isBookmarked) {
        bookmarkBtn.innerText = "Bookmarked";
        addBookmark(recipeCardHTML);
        console.log("Bookmark added");
        } else {
        bookmarkBtn.innerText = "Bookmark";
        removeBookmark(recipeCardHTML);
        console.log("Bookmark removed");
        }
    });
    });


    function addBookmark(recipeCardHTML) {
        const bookmarks = getBookmarks();
        bookmarks.push(recipeCardHTML);
        saveBookmarks(bookmarks);
      }
      function removeBookmark(recipeCardHTML) {
        const bookmarks = getBookmarks();
        const index = bookmarks.indexOf(recipeCardHTML);
        if (index !== -1) {
          bookmarks.splice(index, 1);
          saveBookmarks(bookmarks);
        }
      }
      function getBookmarks() {
        const bookmarksJSON = localStorage.getItem("bookmarks");
        return bookmarksJSON ? JSON.parse(bookmarksJSON) : [];
      }
      function saveBookmarks(bookmarks) {
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      }
}





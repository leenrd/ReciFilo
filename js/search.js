const sectionResults = document.getElementById("searchResults");
const searchBtn = document.getElementById("searchBtn");
const db = firebase.firestore();
const uid = sessionStorage.getItem('uid');
const bookmarksCollection = db.collection("users").doc(uid).collection("bookmarks");

searchBtn.addEventListener("click", () => {
    console.log("clickedSearch");
    apiReq();
});

const apiReq = async () => {
    const searchInput = document.getElementById("searchBar");
    const APP_ID = "a7bcdd71";
    const API_KEY = "2f3291ec2a896239f90605d217897ca3";
    let response = await fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=${searchInput.value}`);
    let data = await response.json();
    let recipes = data.hits;

    if (recipes.length === 0) {
        sectionResults.innerHTML = "<p>No Dishes found...</p>";
    } else {
        sectionResults.innerHTML = "";
    }

    recipes.forEach((item) => {
        let rep = item.recipe;
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

        const bookmarkBtn = card.querySelector(".bookmark-btn");
        const recipeId = item.recipe.uri;
        const recipeCardHTML = card.outerHTML;

        bookmarkBtn.addEventListener("click", () => {
            const isBookmarked = card.classList.toggle("bookmarked");

            if (isBookmarked) {
                bookmarkBtn.innerText = "Bookmarked";
                addBookmark(recipeId, recipeCardHTML);
                console.log("Bookmark added");
            } else {
                bookmarkBtn.innerText = "Bookmark";
                removeBookmark(recipeId, recipeCardHTML);
                console.log("Bookmark removed");
            }
        });
    });
};

function removeBookmark(recipeId) {
    bookmarksCollection
        .where("recipeId", "==", recipeId)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref
                    .delete()
                    .then(() => {
                        console.log("Bookmark removed");
                    })
                    .catch((error) => {
                        console.error("Error removing bookmark: ", error);
                    });
            });
        })
        .catch((error) => {
            console.error("Error getting bookmark: ", error);
        });
}

function getBookmarks() {
    return bookmarksCollection
        .get()
        .then((querySnapshot) => {
            const bookmarks = [];
            querySnapshot.forEach((doc) => {
                bookmarks.push(doc.data().recipeId);
            });
            return bookmarks;
        })
        .catch((error) => {
            console.error("Error getting bookmarks: ", error);
            return [];
        });
}

function addBookmark(recipeId, recipeCardHTML) {
    bookmarksCollection
        .add({
            recipeId: recipeId,
            recipeCardHTML: recipeCardHTML
        })
        .then((docRef) => {
            console.log("Bookmark added with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding bookmark: ", error);
        });
}

// Retrieve and use the bookmarks for the current user
getBookmarks().then((bookmarks) => {

});

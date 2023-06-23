const logoutBtn = document.getElementById("logOutBtn").onclick = (() => {
    console.log("logout");
    firebase.auth().signOut().then(() => {
        sessionStorage.removeItem("uid");
        localStorage.clear();
        alert('Logged Out!')
        window.location.href = "../src/LogInPage.html";
    })

})
const loginBtn = document.getElementById("loginBtn").onclick = ((e) => {
    e.preventDefault();

    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        document.getElementById('email').style.border = "2px solid red"
        alert("Enter a valid email!")
        document.getElementById('email').value = ""
        return false
    }else {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                sessionStorage.setItem("uid", userCredentials.user.uid);
                window.location.href = "../src/index.html";
            })
            .catch(err => {
                console.log(err);
                alert(`There is an error in the server ಥ_ಥ: ${err}`);
            });
    }
})

const googleBtn = document.getElementById('signIn-Google');

googleBtn.addEventListener('click', (e) => {
    e.preventDefault();

    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            var credential = result.credential;
            // console.log(result.user.uid)
            sessionStorage.setItem("uid", result.user.uid);
            alert("Login Success!", credential);
            window.location.href = "../src/index.html";
        })
        .catch((error) => {
            alert("Login Failed!", error);
        });
});


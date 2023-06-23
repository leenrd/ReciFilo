const regBtn = document.getElementById("submitBtn").onclick = ((e) => {
    e.preventDefault();

    const username = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const repass = document.getElementById("rePassword").value;

    // verification
    if(username.length >= 20 || username.length <= 3){
        document.getElementById('name').style.border = "2px solid red"
        alert("Username must at least be more than 3 characters!")
        document.getElementById('name').value = ''
        return false
    }

    if(password.length < 8){
        document.getElementById('password').style.border = "2px solid red"
        alert("Password must at least be more than 8 characters!")
        document.getElementById("password").value = ''
        return false
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        document.getElementById('email').style.border = "2px solid red"
        alert("Enter a valid email!")
        document.getElementById('email').value = ""
        return false
    }

    if (password !== repass) {
        document.getElementById('password').style.border = "2px solid red"
        document.getElementById('rePassword').style.border = "2px solid red"
        alert("Password & Password Confirmation doesn't match!")
        document.getElementById("password").value = ''
        document.getElementById("rePassword").value = ''
        return false
    }

    firebase.firestore().collection("users").where("usernames", '==', username)
    .get().then((querySnapshot) => {
        querySnapshot.forEach(doc => {
            if (doc.data().username === username) {
                document.getElementById('name').style.border = "2px solid red"
                alert("Username already taken!")
                document.getElementById('name').value = ''
                return false
            }
        });
    }).catch(err => {
        console.log('Unable to fetch from database', err)
    })

    {
        const today = new Date()

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            const userId = user.uid;

            user.updateProfile({
            displayName: username
            })
            .then(() => {
            firebase.firestore().collection("users").doc(userId).set({
                username: username,
                email: email,
                userId: userId,
                created_at: today.getFullYear() + ' ' + (today.getMonth() + 1) + ' ' + today.getDate()
            })
            .then(() => {
                alert("Registration Success!");
                window.location.href = "../src/LogInPage.html";
            })
            .catch(err => {
                console.log("Unable to store credentials", err);
                return false;
            });
            })
            .catch(err => {
            console.log("Unable to update user profile", err);
            return false;
            });
        })
        .catch(err => {
            console.log("Unable to create user", err);
            return false;
        });

    }
})


const googleBtn = document.getElementById('signIn-Google').onclick = ((e) => {
    e.preventDefault();

    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        var token = credential.accessToken;
        var user = result.user;
        alert("Registration Success!");
        window.location.href = "../src/LogInPage.html";
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
    });
})
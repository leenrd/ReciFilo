

firebase.auth().onAuthStateChanged(user => {
  if (user) {
      const displayName = user.displayName;
      const email = user.email;
      const nameOfUser = document.getElementById("userName");
      if (displayName) {
        nameOfUser.innerText = `Hi! ${displayName} 👋✌️`;
      } else {
        nameOfUser.innerText = "Hi!";
      }
  }
});


const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('settingsModal');
const closeModalBtn = document.getElementsByClassName('close')[0];

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});


const getElement = (selector) => {
    const element = document.querySelector(selector)

    if (element) return element
    throw Error(
      `Please double check your class names, there is no ${selector} class`
    )
}

const links = getElement('.nav-links')
const navBtnDOM = getElement('.nav-btn')

  navBtnDOM.addEventListener('click', () => {
    links.classList.toggle('show-link')
  })

let prevScrollpos = window.pageYOffset;
      window.onscroll = function() {
let currentScrollPos = window.pageYOffset;
if (prevScrollpos > currentScrollPos) {
  document.querySelector("#navbar").style.top = "0";
} else {
  document.querySelector("#navbar").style.top = "-100px";
}
prevScrollpos = currentScrollPos;
}

const editNameBtn = document.getElementById("edit-name")
const editPassBtn = document.getElementById("edit-pass")
const editEmailBtn = document.getElementById("edit-email")
const panel = document.getElementById("panel")

editNameBtn.addEventListener("click", () => {
  panel.innerHTML = `
  <div class='contModal'>
  <label class='labelModal' for="username">New Name</label>
  <input class='inputModalname' id="inputModalname" type="text" placeholder="eg.John" required>
  <button class='confirmModalbtnName' id='changeNameBTN'>Confirm</button>
  </div>
  `

  const confirmModalbtnName = document.getElementById("changeNameBTN");
  const inputModalname = document.getElementById("inputModalname");

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      confirmModalbtnName.addEventListener("click", () => {
        const newUsername = inputModalname.value;

        user
          .updateProfile({
            displayName: newUsername,
          })
          .then(() => {
            alert("Username updated successfully!");
            inputModalname.value = ''
          })
          .catch((error) => {
            alert("Error updating username: " + error.message);
          });
      });
    }
  });
})

editPassBtn.addEventListener("click", () => {
  panel.innerHTML = `
  <div class='contModal'>
  <label class='labelModal' for="username">New Password</label>
  <input class='inputModal' id="name" type="text" placeholder="eg.John" required>
  <label class='labelModal' for="username">Confirm Password</label>
  <input class='inputModal' id="inputModalpass" type="text" placeholder="eg.John" required>
  <button class='confirmModalbtn' id='changePassBTN'>Confirm</button>
  </div>
  `

  const confirmModalbtnPass = document.getElementById("changePassBTN");
  const inputModalpass = document.getElementById("inputModalpass");

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      confirmModalbtnPass.addEventListener("click", () => {
        const newPass = inputModalpass.value;

        user
          .updatePassword(newPass)
          .then(() => {
            alert("Password updated successfully!");
            inputModalpass.value = ""
          })
          .catch((error) => {
            alert("Error updating password: " + error.message);
          });
      });
    }
  });
})

editEmailBtn.addEventListener("click", () => {
  panel.innerHTML = `
  <div class='contModal'>
  <label class='labelModal' for="username">New Email</label>
  <input class='inputModal' id="inputModalemail" type="text" placeholder="eg.John" required>
  <button class='confirmModalbtn' id='changeEmailBTN'>Confirm</button>
  </div>
  `

  const changeEmailBTN = document.getElementById("changeEmailBTN");
  const inputModalemail = document.getElementById("inputModalemail");

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      changeEmailBTN.addEventListener("click", () => {
        const newEmail = inputModalemail.value;

        user
          .updateEmail(newEmail)
          .then(() => {
            alert("Email updated successfully!");
            inputModalemail.value = ""
          })
          .catch((error) => {
            alert("Email updating username: " + error.message);
          });
      });
    }
  });
})




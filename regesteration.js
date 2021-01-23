const userName = document.getElementById("userName");
const password = document.getElementById("password");
let SignUp = document.getElementById("SignUp");
let flag = "Login";


document.querySelector("form span").addEventListener("click", event => {
    userName.style.border = "blue 3px solid";
    password.style.border = "blue 3px solid";

    document.querySelector(".userexist").style.display = "none";
    document.querySelector(".userAdded").style.display = "none";
    document.querySelector(".userNotExist").style.display = "none";

    if (flag == "Login") {
        event.target.textContent = "alredy user??";
        flag = "SignUp";
        SignUp.value = "SignUp";
    } else {
        event.target.textContent = "not a user??";
        flag = "Login";
        SignUp.value = "Login";

    }
})


document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
    document.querySelector(".userexist").style.display = "none";
    document.querySelector(".userAdded").style.display = "none";
    document.querySelector(".userNotExist").style.display = "none";
    userName.style.border = "blue 3px solid";
    password.style.border = "blue 3px solid";

    if (userName.value == "" || password.value == "") {
        userName.style.border = "red 3px solid";
        password.style.border = "red 3px solid";

    } else {
        if (flag == "Login") {
            login(userName.value, password.value);
        } else {
            addUser(userName.value, password.value);

        }
    }


});

function addUser(user, pass) {
    const users = localStorage.getItem("users");
    let arr = [];
    const obj = {
        userName: user,
        password: pass,
        list: []
    }
    if (!users) { //if the users in localStorage
        arr.push(obj);
    } else {
        arr = JSON.parse(localStorage.getItem("users") || "[]");

        for (let i = 0; i < arr.length; i++) {
            const { userName } = arr[i];
            if (userName === user) {
                document.querySelector(".userexist").style.display = "flex";
                document.getElementById("userName").style.border = "red 3px solid";
                password.style.border = "red 3px solid";
                return "user Already Exist";
            }
        }

        arr.push(obj);
    }
    localStorage.setItem("users", JSON.stringify(arr));
    document.querySelector(".userAdded").style.display = "flex";
    userName.style.border = "blue 3px solid";
    password.style.border = "blue 3px solid";
}


function login(user, pass) {
    const users = localStorage.getItem("users");
    if (!users) {
        document.querySelector(".userNotExist").style.display = "flex";
        userName.style.border = "red 3px solid";
        password.style.border = "red 3px solid";
    } else {
        arr = JSON.parse(localStorage.getItem("users") || "[]");
        for (let i = 0; i < arr.length; i++) {
            const { userName, password } = arr[i];
            if (userName === user && password == pass) {
                localStorage.setItem("currentUser", userName);
                window.location.replace("mainPage.html");
                return "ok";
            }
        }
        document.querySelector(".userNotExist").style.display = "flex";
        userName.style.border = "red 3px solid";
        password.style.border = "red 3px solid";

    }
}
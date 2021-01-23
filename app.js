const form = document.querySelector("form");
const input = document.getElementById("taskInput");
const ol = document.querySelector("ol");

const theCorrentUser = localStorage.getItem("currentUser");
let arr = JSON.parse(localStorage.getItem("users") || "[]");
let userPossition;

for (let i = 0; i < arr.length; i++) {
    const { userName } = arr[i];
    if (userName === theCorrentUser) {
        userPossition = i;
    }
}

buildTasks(arr[userPossition].list);

form.addEventListener("submit", event => {
    event.preventDefault();
    if (input.value.length === 0)
        alert("you must write somthing");
    else {
        addTask(input.value);
        obj = {
            theTask: input.value,
            checked: false
        }
        arr[userPossition].list.push(obj);
        localStorage.setItem("users", JSON.stringify(arr));
        input.value = "";

    }
})

function addTask(theTask, checked = false) {
    const li = document.createElement("li");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    const i1 = document.createElement("i");
    const span3 = document.createElement("span");
    const span4 = document.createElement("span");
    const i2 = document.createElement("i");
    const div = document.createElement("div");
    span1.textContent = theTask;
    if (checked) {
        span1.className = "checked";
    }
    i1.className = "fa fa-trash-o";
    i2.className = "fa fa-pencil";
    span3.innerHTML = "&#10003;";


    span2.addEventListener("click", e => {
        li.remove();
        getList();
    })

    span3.addEventListener("click", e => {
        span1.classList.toggle("checked");
        getList();

    })

    span4.addEventListener("click", e => {
        span1.remove();
        span4.style.visibility = "hidden";
        const TempInput = document.createElement("input");
        const TempBtn = document.createElement("button");
        TempInput.value = span1.textContent;
        TempBtn.innerHTML = "OK";

        li.appendChild(TempInput);
        li.appendChild(TempBtn);
        TempBtn.addEventListener("click", ev => {
            span1.textContent = TempInput.value;
            TempInput.remove();
            TempBtn.remove();
            li.appendChild(span1);
            span4.style.visibility = "visible";
            getList();

        })


    })

    span2.appendChild(i1);
    span4.appendChild(i2);
    div.appendChild(span2);
    div.appendChild(span3);
    div.appendChild(span4);
    li.appendChild(span1);
    li.appendChild(div);
    ol.appendChild(li);



}

function buildTasks(arr) {
    arr.forEach(theTasks => {
        const { theTask, checked } = theTasks;
        addTask(theTask, checked);
    });
}

document.getElementById("logout").addEventListener("click", event => {
    window.location.replace("index.html");

})

function getList() {
    const theList = document.querySelectorAll("li >  span")
    let todoArr = [];

    for (let i = 0; i < theList.length; i++) {
        let obj = {};
        console.log("asd");
        obj.theTask = theList[i].textContent;
        if (theList[i].className.includes("checked")) {
            obj.checked = true;
        } else {
            obj.checked = false;

        }
        todoArr.push(obj);


    }
    arr[userPossition].list = todoArr;
    localStorage.setItem("users", JSON.stringify(arr));

}
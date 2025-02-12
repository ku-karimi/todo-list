// change theme
let colorBox = document.querySelector(":root") ;
let themeIcon = document.getElementById("img-theme");
const themeIconsSrc = [ "./images/icon-sun.svg" , "./images/icon-moon.svg"] ;
const images = ["url(./images/bg-desktop-dark.jpg)" , "url(./images/bg-desktop-light.jpg)"]
let head = document.getElementsByClassName("head") ;

function colorFunc() {
    if (themeIcon.getAttribute("src") == themeIconsSrc[0]) {
        colorBox.style.setProperty('--bodyColor' , '#fafafa');
        colorBox.style.setProperty('--font' , '#666777');
        colorBox.style.setProperty('--list' , '#ffffff');
        head[0].style.background = images[1];
        themeIcon.src = themeIconsSrc[1];
    }else if(themeIcon.getAttribute("src") == themeIconsSrc[1]){
        colorBox.style.setProperty('--bodyColor' , '#181824');
        colorBox.style.setProperty('--font' , 'snow');
        colorBox.style.setProperty('--list' , '#25273c');
        themeIcon.src = themeIconsSrc[0] ;
        head[0].style.background = images[0];

    }else{
        return ;
    }
}

themeIcon.addEventListener("click" , colorFunc)

// work list
let works = [] ;
const list = document.getElementById("work") ;
let item = document.getElementById("item") ;
let bodyDiv = document.getElementsByClassName("body");

function createList() {
    for(let index of works){
        if (index.position == true) {
            const divElem = document.createElement("div") ;
            divElem.setAttribute("class" , "work") ;
            const span = document.createElement("span");
            span.setAttribute("onclick" , "doUndo(event)") ;
            span.style.background = "none" ;
            divElem.appendChild(span) ;
            const labelElem = document.createElement("label") ;
            labelElem.innerHTML = index.text ;
            divElem.appendChild(labelElem) ;
            list.appendChild(divElem) ;
        }else{
            const divElem = document.createElement("div") ;
            divElem.setAttribute("class" , "work") ;
            const span = document.createElement("span");
            span.setAttribute("onclick" , "doUndo(event)") ;
            span.style.background = "var(--select)" ;
            divElem.appendChild(span) ;
            const labelElem = document.createElement("label") ;
            labelElem.innerHTML = index.text ;
            const delElem = document.createElement("del") ;
            delElem.appendChild(labelElem) ;
            divElem.appendChild(delElem) ;
            list.appendChild(divElem) ;
        }

    };
    let count = works.length ;
    item.innerHTML = `${count} item` ;
    (works.length >= 6) ? bodyDiv[0].style.height = "fit-content" : bodyDiv[0].style.height = "100%" ;
}

window.addEventListener("load" , createList) ; 

// add work 
const input = document.getElementById("add-work") ;

function addWork(event) {
    if (event.code == "Enter") {
        if (input.value !== "") {
            let obj ={
                text : input.value,
                position : true,
            }
            works.push(obj) ;
            list.innerHTML = "" ;
            createList() ;
            input.style.border = "none" ;
            input.value = "" ;
        }else{
            input.style.border = "2px solid red";
        }
    }else{
        return ;
    }
}

window.addEventListener("keydown" , addWork) ;

// do work
function doUndo(event) {
    let work ;
    let textElement = event.target.parentElement.querySelector("label") ;
    for(let x of works){
        if (x.text == textElement.innerHTML) {
            work = x ;
            break ;
        }
    }

    if (work.position == true) {
        work.position = false ;
        const delElem = document.createElement("del") ;
        delElem.append(textElement) ; 
        event.target.parentElement.appendChild(delElem) ;
        event.target.style.background = "var(--select)" ;
    }else{
        work.position = true ;
        const delRemov = event.target.parentElement.querySelector("del") ;
        if (delRemov) {
            delRemov.remove();
        }
        event.target.parentElement.appendChild(textElement) ;
        event.target.style.background = "none" ;
    }

}

// information box all
const all = document.getElementById("all") ;

all.addEventListener("click" , function () {
    list.innerHTML = "" ;
    createList() ;
}) ;

// information box activ
const active = document.getElementById("active") ;

function activFunc() {
    let activObj = [] ;
    list.innerHTML = "" ;
    for(let x of works){
        if (x.position == true) {
            const divElem = document.createElement("div") ;
            divElem.setAttribute("class" , "work") ;
            const span = document.createElement("span");
            span.setAttribute("onclick" , "doUndo(event)") ;
            divElem.appendChild(span) ;
            const labelElem = document.createElement("label") ;
            labelElem.innerHTML = x.text ;
            divElem.appendChild(labelElem) ;
            list.appendChild(divElem) ;
            activObj.push(x) ;
        }
    }
    let count = activObj.length ;
    item.innerHTML = `${count} item` ;
    (activObj.length >= 6) ? bodyDiv[0].style.height = "fit-content" : bodyDiv[0].style.height = "100%" ;
}

active.addEventListener("click" , activFunc) ;

// information box completed 
const completed = document.getElementById("completed") ;

function completedFunc() {
    let completedObj = [] ;
    list.innerHTML = "" ;
    for(let x of works){
        if (x.position == false) {
            const divElem = document.createElement("div") ;
            divElem.setAttribute("class" , "work") ;
            const span = document.createElement("span");
            span.setAttribute("onclick" , "doUndo(event)") ;
            divElem.appendChild(span) ;
            const labelElem = document.createElement("label") ;
            labelElem.innerHTML = x.text ;
            divElem.appendChild(labelElem) ;
            list.appendChild(divElem) ;
            completedObj.push(x) ;
        }
    }
    let count = completedObj.length ;
    item.innerHTML = `${count} item` ;
    (completedObj.length >= 6) ? bodyDiv[0].style.height = "fit-content" : bodyDiv[0].style.height = "100%" ;
}

completed.addEventListener("click" , completedFunc) ;

// clear completed 
const clear = document.getElementById("clear") ;

clear.addEventListener("click" , function () {
    works = [] ;
    list.innerHTML = "" ;
    let count = works.length ;
    item.innerHTML = `${count} item` ;
})

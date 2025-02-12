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
let works = [
    {text: "Learn js" , position: true } ,
    {text: "go gem" , position: true }
] ;
const list = document.getElementById("work") ;
let bodyDiv = document.getElementsByClassName("body");

function createList() {
    for(let index of works){
        const divElem = document.createElement("div") ;
        divElem.setAttribute("class" , "work") ;
        const span = document.createElement("span");
        span.setAttribute("onclick" , "doUndo(event)") ;
        divElem.appendChild(span) ;
        const labelElem = document.createElement("label") ;
        labelElem.innerHTML = index.text ;
        divElem.appendChild(labelElem) ;
        list.appendChild(divElem) ;
    };
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

// 
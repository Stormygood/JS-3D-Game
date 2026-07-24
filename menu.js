var menu_1 = document.getElementById("menu1");
var menu_2 = document.getElementById("menu2");
var menu_3 = document.getElementById("menu3");
var strt_gm_btn = document.getElementById("button1");
var cntrl_btn = document.getElementById("button2");
var bck_btn = document.getElementById("button3");
var instruct_btn = document.getElementById("button4");
var instruct_back_btn = document.getElementById("button5");

//create menu nav

cntrl_btn.onclick = function(){
    menu_1.style.display = "none";
    menu_2.style.display = "block"; 
}

bck_btn.onclick = function(){
    menu_2.style.display = "none";
    menu_1.style.display = "block";
}

instruct_btn.onclick = function(){
menu_1.style.display = "none";
menu_3.style.display = "block";
}

instruct_back_btn.onclick = function(){
    menu_3.style.display = "none";
    menu_1.style.display = "block";
}


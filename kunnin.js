//world const
var deg = Math.PI/180;


//plrs class

function player(x, y, z, rx, ry){
    this.x = x;
    this.y = y;
    this.z = z;
    this.rx = rx;
    this.ry = ry;
}

var nob = new player(0, 0, 0, 0, 0);

var ork = document.getElementById("ork");


//vars for mvmnt

var PressLeft = 0;
var PressRight = 0;
var PressForward = 0;
var PressBack = 0;
var PressUp =0;
var Rotate = 0;
var speed = 1;
//tp var to check if it has been teleported already or not
let tp_var = 0;
var mouseX = 0;
var mouseY = 0;
var lock = false;

var container = document.getElementById("waaagh");
//chnages the lock state
container.onclick = function (){
    container.requestPointerLock();
}

//on event request changes the state of the lock variable
document.addEventListener("pointerlockchange", (event) => {
    lock = !lock;
})


//if the key is pressed
document.addEventListener("keydown", (event) => {
    if(event.key == 'r'){
    nob.x = 0;
    nob.y = 0;
    nob.z = 0;
    nob.rx = 0;
    nob.ry = 0;
    console.log("TPd center")
    }

    if(event.key == 't'){
        if(tp_var == 1){
        nob.x = -400;
        nob.y = -300;  
        tp_var = 0;  
        console.log("TPd opposite");
        console.log(nob.x);
        console.log(nob.y);
        } else {
            nob.x = 400;
        nob.y = 300;
        tp_var = 1;
        console.log("TPd new");
        console.log(nob.x);
        console.log(nob.y);
        }
        
    }

    if(event.key == 'z'){
        speed = 6;
    }

    if(event.key == 'w'){
        PressForward = 1;
    }

    if(event.key == 's'){
        PressBack = 1;
    }

    if(event.key == 'a'){
        PressLeft = 1;
    }

    if(event.key == 'd'){
        PressRight = 1;
    }

    if(event.keyCode == 32){
        PressUp = 1;
    }
})


//if key is released
document.addEventListener("keyup", (event) => {
    if(event.key == 'w'){
        PressForward = 0;
    }

    if(event.key == 's'){
        PressBack = 0;
    }

    if(event.key = 'a'){
        PressLeft = 0;
    }

    if(event.key = 'd'){
        PressRight = 0;
    }

    if(event.keyCode == 32){
        PressUp = 0;
    }

    if(event.key == 'z'){
        speed = 1;
    }
})
//assigns mouse movement to mouse variables
document.addEventListener("mousemove", (event) => {
    mouseX = event.movementX;
    mouseY = event.movementY;
})



function update(){
    // 1st count mvmnt
    //movement is changed based on what angle the mouse has been left
    dx = (PressRight - PressLeft) * Math.cos(nob.ry * deg) - (PressForward - PressBack) * Math.sin(nob.ry * deg);
    dz = -((PressRight - PressLeft) * Math.sin(nob.ry * deg) - (PressForward - PressBack) * Math.cos(nob.ry * deg));
    dy = -PressUp;

    drx = mouseY;
    dry = mouseX;
    mouseX = mouseY = 0;
    console.log(nob.x, nob.y, nob.z, nob.rx, nob.ry);

    //add mvmnt to the coordinates
    //speed is multiplied to the differnece of the coordinates, so the change of the coordinates is sped up
    //chng coords of Ork
    nob.x = nob.x + dx * speed;
    nob.y = nob.y + dy * speed;
    nob.z = nob.z + dz * speed;

    if(lock == true){
        nob.rx = nob.rx +  drx;
    nob.ry = nob.ry + dry;
    }

    //add lookng around

    

    ork.style.transform = "translateZ(100px)" + "rotateX(" + (-nob.rx) +"deg)"+
    "rotateY(" + (-nob.ry) + "deg)"+
    "translate3d(" + (-nob.x) + "px, " + (-nob.y) + "px," + (-nob.z) + "px)";


}

TimerGame = setInterval(update, 10);


//khgvghfkhgtyf
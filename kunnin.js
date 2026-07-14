//plrs class

function player(x, y, z, rx, ry){
    this.x = x;
    this.y = y;
    this.z = z;
    this.rx = rx;
    this.ry = ry;
}


//vars for mvmnt

var PressLeft = 0;
var PressRight = 0;
var PressForward = 0;
var PressBack = 0;
var PressUp =0;
var Rotate = 0;


//if the key is pressed
document.addEventListener("keydown", (event) => {
    while(event.key == 'r'){
        
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
})

var nob = new player(0, 0, 0, 0, 0);

var ork = document.getElementById("ork");

function update(){
    // 1st count mvmnt
    dx = PressRight - PressLeft;
    dz = PressForward - PressBack;
    dy = -PressUp;
    console.log(PressRight);

    //add mvmnt to the coordinates

    nob.x = nob.x + dx;
    nob.y = nob.y + dy;
    nob.z = nob.z + dz;
    console.log(PressUp);
    //chng coords of Ork

    ork.style.transform = "translate3d(" + (-nob.x) + "px, " + (-nob.y) + "px," + (-nob.z) + "px)";


}

TimerGame = setInterval(update, 10);


//khgvghfkhgtyf
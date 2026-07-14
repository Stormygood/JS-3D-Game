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



//if the key is pressed
document.addEventListener("keydown", (event) => {
    if(event.key == 'r'){
    nob.x = 0;
    nob.y = 0;
    console.log("TPd center")
    }

    if(event.key == 't'){
        if(tp_var == 1){
        nob.x = ork.scrollWidth * (-0.5);
        nob.y = ork.scrollHeight * (-0.5);  
        tp_var = 0;  
        console.log("TPd opposite");
        console.log(nob.x);
        console.log(nob.y);
        } else {
            nob.x = ork.clientWidth * 0.5;
        nob.y = ork.clientHeight * 0.5;
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



function update(){
    // 1st count mvmnt
    dx = PressRight - PressLeft;
    dz = PressForward - PressBack;
    dy = -PressUp;
    // console.log(PressRight);

    //add mvmnt to the coordinates
    //speed is multiplied to the differnece of the coordinates, so the change of the coordinates is sped up
    nob.x = nob.x + dx * speed;
    nob.y = nob.y + dy * speed;
    nob.z = nob.z + dz * speed;
    //chng coords of Ork

    ork.style.transform = "translate3d(" + (-nob.x) + "px, " + (-nob.y) + "px," + (-nob.z) + "px)";


}

TimerGame = setInterval(update, 10);


//khgvghfkhgtyf
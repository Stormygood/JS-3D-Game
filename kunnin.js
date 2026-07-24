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

var camera = new player(0, 0, 0, 0, 0);

var world = document.getElementById("world");

//vars for mvmnt

var PressLeft = 0;
var PressRight = 0;
var PressForward = 0;
var PressBack = 0;
var PressUp =0;
var pressDown = 0;
var Rotate = 0;
var speed = 1;
//tp var to check if it has been teleported already or not
let tp_var = 0;
var mouseX = 0;
var mouseY = 0;
var lock = false;
var can_lock = false;

//values in map
//  X Y Z RX RY RZ WIDTH HEIGHT COLOUR

//for the wall variable(basically a matric)
//               0   1   2   3     4    5     6        7        8        9
//#0 -> Wall 1  [X] [Y] [Z] [RX] [RY] [RZ] [HEIGHT] [WIDTH] [COLOUR] [OPACITY]
//#1 -> Wall 2  [X] [Y] [Z] [RX] [RY] [RZ] [HEIGHT] [WIDTH] [COLOUR] [OPACITY]
//#2 -> Wall 3  [X] [Y] [Z] [RX] [RY] [RZ] [HEIGHT] [WIDTH] [COLOUR] [OPACITY]
//#3 -> Wall 4  [X] [Y] [Z] [RX] [RY] [RZ] [HEIGHT] [WIDTH] [COLOUR] [OPACITY]
//#4 -> Ground  [X] [Y] [Z] [RX] [RY] [RZ] [HEIGHT] [WIDTH] [COLOUR] [OPACITY]

var map = [
    [0, -125, -1000, 0, 0, 0, 2000, 500, "images/jungle.webp", 1], //front wall
    [0, -125, 1000, 0, 0, 0, 2000, 500, "images/jungle.webp",  1], //back wall
    [1000, -125, 0, 0, 90, 0, 2000, 500, "images/jungle.webp", 1], //right wall
    [-1000, -125, 0, 0, 90, 0, 2000, 500, "images/jungle.webp", 1],
    [0, 125, 0, 90, 0, 0, 2000, 2000, "images/floor.jpg", 1] //ground

]

var keys = [
    [1500, 80, 300, 0, 0, 0, 75, 75, "images/teef.png", 1],
    [200, 80, 800, 0, 0, 0, 75, 75, "images/teef.png", 1],
    [700, 80, 650, 0, 0, 0, 75, 75, "images/teef.png", 1]
];

var coins = [
    [1250, 0, 450, 0, 0, 0, 75, 75, "images/shoota.webp", 1],
    [200, 0,1250, 0, 0, 0, 75, 75, "images/shoota.webp", 1],
    [700, 0, 1800, 0, 0, 0, 75, 75, "images/shoota.webp", 1]
];

var container = document.getElementById("frame");
//chnages the lock state
container.onclick = function (){
    if(can_lock) container.requestPointerLock();
}

//on event request changes the state of the lock variable
document.addEventListener("pointerlockchange", (event) => {
    lock = !lock;
})


//if the key is pressed
document.addEventListener("keydown", (event) => {
    if(event.key == 'r'){
    camera.x = 0;
    camera.y = 0;
    camera.z = 0;
    camera.rx = 0;
    camera.ry = 0;
    console.log("TPd center")
    }

    if(event.key == 't'){
        if(tp_var == 1){
        camera.x = -400;
        camera.y = -300;  
        tp_var = 0;  
        console.log("TPd opposite");
        console.log(camera.x);
        console.log(camera.y);
        } else {
            camera.x = 400;
        camera.y = 300;
        tp_var = 1;
        console.log("TPd new");
        console.log(camera.x);
        console.log(camera.y);
        }
        
    }

    if(event.keyCode == '16'){
        pressDown = 1;
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

    if(event.keyCode == '16'){
        pressDown = 0;
    }

    if(event.key == 'w'){
        PressForward = 0;
    }

    if(event.key == 's'){
        PressBack = 0;
    }

    if(event.key == 'a'){
        PressLeft = 0;
    }

    if(event.key == 'd'){
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
    //  TODO: left and right mvmnt keys get flipped wehn turning 90 degrees on the X axis
    dx = (PressRight - PressLeft) * Math.cos(camera.ry * deg) - (PressForward - PressBack) * Math.sin(camera.ry * deg);
    if(camera.rx > 6){
        camera.rx = 6;
    } else if(camera.rx < -85){
        camera.rx = -85;
    }
    dz = ((PressLeft - PressRight) * Math.sin(camera.ry * deg) - (PressForward - PressBack) * Math.cos(camera.ry * deg));
    if(pressDown == 1){
        dy = pressDown
    } else if( PressUp == 1){
        dy = -PressUp;
    } else {
        dy = 0;
    }
    // dy = -PressUp;

    drx = mouseY;
    dry = mouseX;
    mouseX = mouseY = 0;
    console.log(camera.x, camera.y, camera.z, camera.rx, camera.ry);

    //add mvmnt to the coordinates
    //speed is multiplied to the differnece of the coordinates, so the change of the coordinates is sped up
    //chng coords of Ork
    camera.x = camera.x + dx * speed;
    camera.y = camera.y + dy * speed;
    camera.z = camera.z + dz * speed;

    if(lock == true){
        camera.rx = camera.rx +  drx;
    camera.ry = camera.ry + dry;
    }

    //add lookng around

    

    world.style.transform = "translateZ(600px)" + "rotateX(" + (camera.rx) +"deg)"+
    "rotateY(" + (-camera.ry) + "deg)"+
    "translate3d(" + (-camera.x) + "px, " + (-camera.y) + "px," + (-camera.z) + "px)";


}


function createObjects(originObj, type){
	for (i = 0; i < originObj.length; i++){
		
		//create rectangles and styles
		let newElement = document.createElement("div");
		newElement.className = "obj";
		newElement.id = type + i;
		console.log(type + i);
		newElement.style.width = originObj[i][6] + "px";
		newElement.style.height = originObj[i][7] + "px";
		newElement.style.backgroundColor = originObj[i][8];
		newElement.style.backgroundImage = "url(" + originObj[i][8] + ")";
		newElement.style.opacity = originObj[i][9];
		newElement.style.transform = "translate3d(" + (600 - originObj[i][6]/2 + originObj[i][0]) + "px," + 
		(400 - originObj[i][7]/2 + originObj[i][1]) + "px," + 
		originObj[i][2] + "px)" + 
		"rotateX(" + originObj[i][3] + "deg)" + 
		"rotateY(" + originObj[i][4] + "deg)" + 
		"rotateZ(" + originObj[i][5] + "deg)";
		
		//insert rectangles into the world
		world.append(newElement);
	}
}

function CreateNewWorld(){
	createObjects(map,"wall");
    createObjects(keys, "key");
    createObjects(coins, "coin");
}

CreateNewWorld();


function interact(originObj,type){
	for (i = 0; i < originObj.length; i++){
		let dis = (originObj[i][0] - camera.x)**2 +
					(originObj[i][1] - camera.y)**2 +
					(originObj[i][2] - camera.z)**2;
		let is = (originObj[i][6])**2;
		if (dis < is){
			document.getElementById(type + i).style.display = "none";
			originObj[i][0] = 100000;
		}
	}
}

function rotate(originObj, type, rotAng){
    for(let i = 0; i < originObj.length; i++){
        originObj[i][4] = originObj[i][4] + rotAng;
        document.getElementById(type + i).style.transform = "translate3d(" + (600 - originObj[i][6] * 0.5 + originObj[i][0]) + "px," +
        (400 - originObj[i][2]) + "px)" + 
        "rotateX(" + originObj[i][3] + "deg)"  + 
        "rotateY" + originObj[i][4] + "deg)" +
        "rotateZ" + originObj[i][5] + "deg)";
    }
}

function repeatForever(){
	update();
	interact(coins,"coin");
	interact(keys,"key");
    rotate(keys, "key", 0.5);
    rotate(coins, "coin", 0.5);
}




//for the wall variable(basically a matric)
//               0   1   2   3     4    5     6        7        8        9
//#0 -> Wall 1  [X] [Y] [Z] [RX] [RY] [RZ] [HEIGHT] [WIDTH] [COLOUR] [OPACITY]
//#1 -> Wall 2  [X] [Y] [Z] [RX] [RY] [RZ] [HEIGHT] [WIDTH] [COLOUR] [OPACITY]
//#2 -> Wall 3  [X] [Y] [Z] [RX] [RY] [RZ] [HEIGHT] [WIDTH] [COLOUR] [OPACITY]
//#3 -> Wall 4  [X] [Y] [Z] [RX] [RY] [RZ] [HEIGHT] [WIDTH] [COLOUR] [OPACITY]
//#4 -> Ground  [X] [Y] [Z] [RX] [RY] [RZ] [HEIGHT] [WIDTH] [COLOUR] [OPACITY]



// function CreateNewWorld(){

//     createBoyz(map, 'wall');
//     for(let i = 0; i < map.length; i++){
//         let nwElement = document.createElement("div");
//         nwElement.className = "obj";
//         nwElement.id = "obj" + i;
//         nwElement.style.width = map[i][6] + "px";
//         nwElement.style.height = map[i][7] + "px";
//         nwElement.style.backgroundImage = "url(" + map[i][8] + ")";
//         nwElement.style.opacity = map[i][9]
//         nwElement.style.transform = "translate3d(" + ((600 - map[i][7]) * 0.5 + map[i][0]) +"px, " + ((400 - map[i][7]) * 0.5 + map[i][1]) +"px, " + map[i][2] +"px)" +
//         "rotateX(" + map[i][3] +"deg)" +
//         "rotateY(" + map[i][4] +"deg)" +
//         "rotateZ(" + map[i][5] +"deg)"
//         console.log('THIS ->>> MEKBOY', i);

//         //append nwElement into the world

//     world.appendChild(nwElement);
//     console.log(`Appendede ${nwElement.id}`);
    
        
//     }
// }
// CreateNewWorld();

//               0   1   2   3     4    5     6        7        8        9
//#0 -> Wall 1  [X] [Y] [Z] [RX] [RY] [RZ] [HEIGHT] [WIDTH] [COLOUR] [OPACITY]
//#1 -> Wall 2  [X] [Y] [Z] [RX] [RY] [RZ] [HEIGHT] [WIDTH] [COLOUR] [OPACITY]
//#2 -> Wall 3  [X] [Y] [Z] [RX] [RY] [RZ] [HEIGHT] [WIDTH] [COLOUR] [OPACITY]
//#3 -> Wall 4  [X] [Y] [Z] [RX] [RY] [RZ] [HEIGHT] [WIDTH] [COLOUR] [OPACITY]
//#4 -> Ground  [X] [Y] [Z] [RX] [RY] [RZ] [HEIGHT] [WIDTH] [COLOUR] [OPACITY]*
//#4 -> Ground  [X] [Y] [Z] [RX] [RY] [RZ] [HEIGHT] [WIDTH] [COLOUR] [OPACITY]



// TimerGame = setInterval(update, 10);
TimerGame = setInterval(repeatForever, 10);


//khgvghfkhgtyf
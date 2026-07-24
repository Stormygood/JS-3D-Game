function update(x, y, z, dx, dy, dz, drx, dry, drz){
    // 1st count mvmnt
    //movement is changed based on what angle the mouse has been left
    dx = (PressRight - PressLeft) * Math.cos(nob.ry * deg) - (PressForward - PressBack) * Math.sin(nob.ry * deg);
    if(nob.rx > 6){
        nob.rx = 6;
    } else if(nob.rx < -85){
        nob.rx = -85;
    }
    dz = ((PressRight - PressLeft) * Math.sin(nob.ry * deg) - (PressForward - PressBack) * Math.cos(nob.ry * deg));
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

    

    world.style.transform = "translateZ(250px)" + "rotateX(" + (nob.rx) +"deg)"+
    "rotateY(" + (-nob.ry) + "deg)"+
    "translate3d(" + (-nob.x) + "px, " + (-nob.y) + "px," + (-nob.z) + "px)";


}
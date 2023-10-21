const line = document.getElementById("line");
isLineActive = false;

function onMouseDownLine(event) {
    let {clientX , clientY} = event; 
    c.beginPath(); 
    c.moveTo(clientX, clientY);
    c.lineWidth = 4 ;
    c.strokeStyle = "blue"; 
}
function onMouseUpLine(event){
    let {clientX, clientY} = event ;
    c.lineTo(clientX, clientY);
    c.stroke();
    c.closePath(); 
}


function onLineClick(){
    line.classList.toggle("active");
    pencil.classList.toggle("active");
    
    canvas.style.cursor = "crosshair";
    canvas.addEventListener("mousedown", onMouseDownLine); 
    canvas.addEventListener("mouseup", onMouseUpLine);
    canvas.removeEventListener("click",onLineClick);
}

line.addEventListener("click",onLineClick);

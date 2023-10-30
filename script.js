const canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

const toolSelected = document.querySelectorAll(`input[name="tool"]`);
const lock = document.getElementById("lock-tool"),
hand = document.getElementById("hand"),
cursor = document.getElementById("cursor"),
rectangle = document.getElementById("rectangle"),
triangle = document.getElementById("triangle"),
circle = document.getElementById("circle"),
arrow = document.getElementById("arrow"),
line = document.getElementById("line"),
pencil = document.getElementById("pencil"),
texttool = document.getElementById("texttool"),
image = document.getElementById("image"),
eraser = document.getElementById("eraser"),
moretool = document.getElementById("moretool");

let drawingColor = "black",
lineWidth = 4,
previousX,
previousY,
isDrawing = false,
selectedtool,
snapshot,
backgroundColor = "white";

let undoDrawing =[];
let redoDrawing =[];

toolSelected.forEach(element => {
    element.addEventListener("input", ()=>{
        selectedtool = element.id;
    })
});

function start(e){
    isDrawing = true;
    previousX = e.offsetX;
    previousY = e.offsetY;
    c.beginPath();
    c.lineWidth = lineWidth;
    c.strokeStyle = drawingColor;
    snapshot = c.getImageData(0, 0, canvas.width, canvas.height);
}
const freehandDrawing = (e) => {
    let currentPosition = [e.offsetX, e.offsetY];
    c.moveTo(previousX,previousY);
    c.lineTo(...currentPosition);
    c.stroke();
    c.closePath();
    previousX = currentPosition[0];
    previousY = currentPosition[1];
};

const drawRectangle = (e) => {
    c.beginPath();
    c.strokeRect(e.offsetX,e.offsetY,previousX - e.offsetX, previousY - e.offsetY,);
    c.stroke();
}

const drawCircle = (e) => {
    c.beginPath();
    let radius = Math.sqrt(
        Math.pow(previousX - e.offsetX, 2) + Math.pow(previousY - e.offsetY, 2)
        );
        c.arc(previousX, previousY, radius, 0, 2 * Math.PI);
        c.stroke();
};

const drawLine = (e) => {
    c.beginPath();
    c.moveTo(previousX,previousY);
    c.lineTo(e.offsetX,e.offsetY);
    c.stroke();
    c.closePath();
}

const drawTriangle = (e) => {
    c.beginPath();
    c.moveTo(previousX, previousY);
    c.lineTo(e.offsetX, e.offsetY);
    c.lineTo(previousX * 2 - e.offsetX, e.offsetY);
    c.closePath();
    c.stroke();

}

const drawArrow = (e) => {
    c.beginPath();
    let dx = e.offsetX - previousX;
    let dy = e.offsetY - previousY;
    var angle = Math.atan2(dy, dx);
    let headlen = 20;
    c.moveTo(previousX,previousY);
    c.lineTo(e.offsetX, e.offsetY);
    c.moveTo(e.offsetX, e.offsetY);
    c.lineTo(e.offsetX - headlen * Math.cos(angle - Math.PI / 6), e.offsetY - headlen * Math.sin(angle - Math.PI / 6));
    c.moveTo(e.offsetX, e.offsetY);
    c.lineTo(e.offsetX - headlen * Math.cos(angle + Math.PI / 6), e.offsetY - headlen * Math.sin(angle + Math.PI / 6));
    c.stroke();    
}
const drawing = (e) => {
    if(isDrawing === false)return;
    c.putImageData(snapshot,0,0);
    if(selectedtool === "pencil"){
        freehandDrawing(e);
    }
    else if(selectedtool === "rectangle"){
        drawRectangle(e);
    }
    else if(selectedtool === "circle"){
        drawCircle(e);
    }
    else if(selectedtool === "line"){
        drawLine(e);
    }
    else if(selectedtool === "triangle"){
        drawTriangle(e);
    }
    else if(selectedtool === "arrow"){
        drawArrow(e);
    }
    else if(selectedtool === "eraser"){
        c.strokeStyle = backgroundColor;
        freehandDrawing(e);
    }
}
canvas.style.cursor = "crosshair";
canvas.addEventListener("mousedown", start);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup",() =>{
    isDrawing = false
    undoDrawing.push(c.getImageData(0,0,canvas.width,canvas.height));
});
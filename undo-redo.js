const undo = document.getElementById("undo"),
redo = document.getElementById("redo");

function undoFunction(){
    if(undoDrawing.length === 1){
        c.clearRect(0,0,canvas.height,canvas.height);
    }else{
        redoDrawing.push(undoDrawing.pop());
        c.putImageData(undoDrawing[undoDrawing.length - 1],0,0);
    }
    console.log(undoDrawing.length);
}

function redoFunction(){
    if(redoDrawing.length != 0){
        c.putImageData(redoDrawing.pop(),0,0);
    }
    console.log(redoDrawing.length);
}
undo.addEventListener("click",undoFunction);
redo.addEventListener("click",redoFunction);
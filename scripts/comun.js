var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var W = window.innerWidth;
var H = window.innerHeight;

canvas.width = W;
canvas.height = H;

var fontSize = 16;
var columns = Math.floor(W / fontSize);
var drops = [];
for(var i=0; i<columns; i++){
    drops.push(0);
}
var str = "AaBbCcDdEeFfGghHiIjJkKlLmMnNoOpPqQrRsStTUuVvXxYyZz1234567890!#$%&/()=";
function draw(){
    context.fillStyle = "rgba(0,0,0,0.05)";
    context.fillRect(0, 0, W, H);
    context.font = "700 16px monospace"
    context.fillStyle = "#2fcb7b";
    for(var i=0; i<columns; i++){
        var index = Math.floor(Math.random()*str.length);
        var x = i * fontSize;
        var y = drops[i] * fontSize;
        context.fillText(str[index], x, y);
        if(y >= canvas.height && Math.random() > 0.99){
            drops[i] = 0;
        }
        drops[i]++;
    }
}
draw();
setInterval(draw, 35);

function mostrarToast(mensaje) {
    document.getElementById("contenedor-toast")?.remove();

    const plantilla = document.getElementById("tpl-toast");
    const nodo = plantilla.content.cloneNode(true);
    nodo.querySelector(".titulo").textContent = mensaje;
    document.body.appendChild(nodo);

    const contenedorToast = document.getElementById("contenedor-toast");
    const toast = document.getElementById("toast");

    contenedorToast.addEventListener("click", (e) => {
        if (e.target.closest("button.btn-cerrar")) {
            toast.classList.add("cerrando");
        }
    });

    toast.addEventListener("animationend", (e) => {
        if (e.animationName === 'cierre') {
            contenedorToast.remove();
        }
        if (e.animationName === 'autoCierre') {
            toast.classList.add("cerrando");
        }
    });
}
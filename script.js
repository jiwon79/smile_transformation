const canvas_draw = document.querySelector(".canvas_draw");
const ctx_draw = canvas_draw.getContext("2d");
const canvas_show = document.querySelector(".canvas_show");
const ctx_show = canvas_show.getContext("2d");
let coord = { x: 0, y: 0 };

document.addEventListener("mousedown", start);
document.addEventListener("mouseup", stop);
// window.addEventListener("resize", resize);

ctx_draw.canvas.width = 500;
ctx_draw.canvas.height = 500;
ctx_show.canvas.width = 500;
ctx_show.canvas.height = 500;

resize();

function resize() {
  // ctx.canvas.width = window.innerWidth;
  // ctx.canvas.height = window.innerHeight;
  ctx_draw.canvas.width = 500;
  ctx_draw.canvas.height = 500;
}

function reposition_draw(event) {
  coord.x = event.clientX - canvas_draw.offsetLeft;
  coord.y = event.clientY - canvas_draw.offsetTop;
}

function start(event) {
  document.addEventListener("mousemove", draw);
  reposition_draw(event);
}

function stop() {
  document.removeEventListener("mousemove", draw);
}

function transformation(point) {
  return {x: point.x + point.y, y: point.x - point.y}
}

function draw(event) {
  ctx_draw.beginPath();
  ctx_draw.lineWidth = 3;
  ctx_draw.lineCap = "round";
  ctx_draw.strokeStyle = "#ACD3ED";
  ctx_show.beginPath();
  ctx_show.lineWidth = 3;
  ctx_show.lineCap = "round";
  ctx_show.strokeStyle = "#ACD1ED";

  ctx_draw.moveTo(coord.x, coord.y);
  transPoint = transformation(coord);
  ctx_show.moveTo(transPoint.x, transPoint.y);
  reposition_draw(event);

  transPoint = transformation(coord);  
  ctx_draw.lineTo(coord.x, coord.y);
  ctx_show.lineTo(transPoint.x, transPoint.y);
  ctx_draw.stroke();
  ctx_show.stroke();  
}